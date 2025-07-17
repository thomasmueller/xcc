#!/bin/bash

# Build Web App Locally (macOS M1 version of deploywcc.yml)
# This script replicates the GitHub Actions workflow for building the web app

set -e  # Exit on any error

echo "🚀 Building Web App Locally (macOS M1)"
echo "======================================"

# Check if we're in the right directory
if [ ! -f "Makefile" ] || [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Step 1: Check Node.js version
echo "📋 Step 1: Checking Node.js version..."
NODE_VERSION=$(node --version 2>/dev/null || echo "none")
if [[ "$NODE_VERSION" == "none" ]]; then
    echo "❌ Node.js is not installed. Please install Node.js 20.x or higher"
    echo "   You can install it with: brew install node"
    exit 1
fi

MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
if [ "$MAJOR_VERSION" -lt 20 ]; then
    echo "⚠️  Warning: Node.js version is $NODE_VERSION, but 20.x+ is recommended"
else
    echo "✅ Node.js version: $NODE_VERSION"
fi

# Step 2: Install LLVM tools (macOS equivalent of llvm-dev)
echo "📋 Step 2: Checking LLVM tools..."
if ! command -v llvm-ar &> /dev/null; then
    echo "⚠️  LLVM tools not found. Installing via Homebrew..."
    if ! command -v brew &> /dev/null; then
        echo "❌ Homebrew is not installed. Please install Homebrew first:"
        echo "   /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
        exit 1
    fi
    brew install llvm
    echo "✅ LLVM tools installed"
else
    echo "✅ LLVM tools found"
fi

# Step 3: Install NPM packages
# echo "📋 Step 3: Installing NPM packages..."
# npm ci
# echo "✅ NPM packages installed"

# Step 4: Build the project
echo "📋 Step 4: Building the project..."
echo "   Building wcc compiler..."
make -j$(sysctl -n hw.ncpu) wcc

echo "   Building assets..."
make assets

echo "   Building web app with Vite..."
npm run release

echo "   Post-processing: Embedding assets as data URLs..."
cd release

# Convert wasi_worker.js to base64 data URL
if [ -f "wasi_worker.js" ]; then
    echo "     Converting wasi_worker.js to data URL..."
    
    # Create base64 encoded data URL
    WORKER_BASE64=$(base64 -i wasi_worker.js)
    WORKER_DATA_URL="data:application/javascript;base64,$WORKER_BASE64"
    
    # Replace the worker import with the data URL in simple.js
    if [ -f "simple.js" ]; then
        # Use a more robust replacement that handles the exact Vite pattern
        sed -i '' "s|new URL(\"wasi_worker.js\", *import.meta.url).href|\"$WORKER_DATA_URL\"|g" simple.js
        
        # Remove the separate worker file since it's now embedded
        rm wasi_worker.js
        
        echo "     ✅ Web Worker embedded as data URL"
        echo "     ✅ Removed separate wasi_worker.js file"
    else
        echo "     ⚠️  simple.js not found, skipping worker embedding"
    fi
else
    echo "     ⚠️  wasi_worker.js not found, skipping worker embedding"
fi

# Convert wccfiles.zip to base64 data URL
if [ -f "wccfiles.zip" ]; then
    echo "     Converting wccfiles.zip to data URL..."
    
    # Create base64 encoded data URL for zip file
    ZIP_BASE64=$(base64 -i wccfiles.zip)
    ZIP_DATA_URL="data:application/zip;base64,$ZIP_BASE64"
    
    # Replace the zip file reference with the data URL in simple.js
    if [ -f "simple.js" ]; then
        # Replace the zip file path with data URL
        sed -i '' "s|\"wccfiles.zip\"|\"$ZIP_DATA_URL\"|g" simple.js
        
        # Remove the separate zip file since it's now embedded
        rm wccfiles.zip
        
        echo "     ✅ wccfiles.zip embedded as data URL"
        echo "     ✅ Removed separate wccfiles.zip file"
    else
        echo "     ⚠️  simple.js not found, skipping zip embedding"
    fi
else
    echo "     ⚠️  wccfiles.zip not found, skipping zip embedding"
fi

if [ -f "simple.js" ] && [ -f "simple.html" ]; then
    
    cat simple.html | sed "s|type=\"module\" crossorigin||" > temp.html
    
    
    # Clean up
    rm simple.html
    mv temp.html index.html
    
else
    echo "     ⚠️  simple.js or simple.html not found, skipping embedding"
fi

cd ..

# Step 5: Report results
echo ""
echo "🎉 Build completed successfully!"
echo "=============================="
echo ""
echo "📂 Web app built in: ./release/"
echo "🌐 To serve locally, you can use:"
echo "   cd release && python3 -m http.server 8000"
echo "   Then open: http://localhost:8000"
echo ""
mkdir -p docs
cp release/index.html docs/index.html
cp release/simple.js docs/simple.js

echo "📦 Final build artifacts:"
ls -la release/ 2>/dev/null || echo "   (release directory contents will be shown after build)"
echo ""
echo "✨ Done! Simple web app is now a single self-contained HTML file!"
echo ""
echo "📱 Available application:"
echo "   • Simple Editor: simple.html (complete WebAssembly C compiler in one file)"

echo ""
echo "🚀 Local testing URL:"
echo "   • Simple Editor: http://localhost:8000/simple.html"
echo ""
echo "💡 Note: You can now open simple.html directly in any browser without a server!"
