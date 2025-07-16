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
echo "📦 Build artifacts:"
ls -la release/ 2>/dev/null || echo "   (release directory contents will be shown after build)"
echo ""
echo "✨ Done! Both web apps are ready to deploy."
echo ""
echo "📱 Available applications:"
echo "   • Advanced IDE: index.html"
echo "   • Simple Editor: simple.html"

mkdir -p docs
cp -r release/* docs/

echo ""
echo "🚀 Local testing URLs:"
echo "   • Advanced: http://localhost:8000/index.html"
echo "   • Simple:   http://localhost:8000/simple.html"
