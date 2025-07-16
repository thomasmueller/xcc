# Simple C Compiler Web Apps

This project now includes **two web applications** for the C-to-WebAssembly compiler:

## 🎯 Applications Overview

### 1. **Advanced IDE** (`index.html`)
- **Monaco Editor** with syntax highlighting and IntelliSense
- **Split-pane interface** with resizable panels
- **Advanced features**: File system access, sharing, multiple run modes
- **Professional UI** with dropdowns, menus, and shortcuts
- **Error highlighting** directly in the editor
- **Target audience**: Developers who want a full IDE experience

### 2. **Simple Editor** (`simple.html`) ⭐ **NEW**
- **Plain textareas** for source input and output
- **Minimal, clean interface** - no complex UI components
- **Same compilation power** as the advanced version
- **Instant feedback** with status messages
- **Ultra-minimal interface** - just code input and output
- **Target audience**: Beginners, educational use, or those who prefer simplicity

## 🚀 Features Comparison

| Feature | Advanced IDE | Simple Editor |
|---------|-------------|---------------|
| Code editing | Monaco Editor | Plain textarea |
| Syntax highlighting | ✅ | ❌ |
| Error highlighting | ✅ | ❌ |
| File system access | ✅ | ❌ |
| Code sharing | ✅ | ❌ |
| Split panes | ✅ | ❌ |
| Example programs | ✅ | ❌ |
| Compilation | ✅ | ✅ |
| WebAssembly execution | ✅ | ✅ |
| WebAssembly disassembly | ✅ | ✅ |
| Command line arguments | ✅ | ❌ |
| Mobile friendly | ❌ | ✅ |

## 🛠️ Building

Use the provided build script to create both applications:

```bash
./build_webapp_local.sh
```

This will:
1. Build the WCC compiler from source
2. Create both web applications in the `release/` directory
3. Copy everything to `docs/` for easy deployment

## 🌐 Local Testing

After building, serve the files locally:

```bash
cd release
python3 -m http.server 8000
```

Then open:
- **Advanced IDE**: http://localhost:8000/index.html
- **Simple Editor**: http://localhost:8000/simple.html

## 🎓 Use Cases

### Simple Editor is Perfect For:
- **Teaching C programming** - minimal distractions
- **Quick code testing** - just write and run
- **Mobile devices** - responsive design
- **Embedding** in other applications
- **Users who prefer simplicity** over features

### Advanced IDE is Best For:
- **Serious development work**
- **Complex projects** with multiple files
- **Users familiar with modern IDEs**
- **Professional presentations** or demos

## 🔧 Technical Details

Both applications:
- Use the **same WCC compiler backend**
- Support **full C language features**
- Generate **identical WebAssembly output**
- Provide **compilation error reporting**

The advanced IDE additionally includes:
- **Example programs** (Hello World, Sieve, Quick Sort, AOBench)
- **Command line arguments** support

The simple editor reuses all the compilation infrastructure but provides a much cleaner, more approachable interface using plain HTML form elements instead of complex UI libraries.

## 📱 Mobile Support

The simple editor is designed to work well on mobile devices with:
- **Responsive layout** that stacks vertically on small screens
- **Touch-friendly buttons** and controls
- **No complex interactions** that don't work well on mobile
- **Simple keyboard shortcuts** (Cmd/Ctrl+Enter to run)
- **Minimal interface** with just Run and Compile buttons

Perfect for learning C programming on tablets or phones! 