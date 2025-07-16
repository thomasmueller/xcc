import {DisWasm} from './diswasm'
import {Util} from './util'
import {WccRunner} from './wcc_runner'

// DOM elements
let sourceTextarea: HTMLTextAreaElement
let outputTextarea: HTMLTextAreaElement
let runBtn: HTMLButtonElement
let compileBtn: HTMLButtonElement
let statusDiv: HTMLDivElement

// WCC Runner instance
let wccRunner: WccRunner
let isLoaded = false

// Initialize the application
async function init() {
  // Get DOM elements
  sourceTextarea = document.getElementById('sourceCode') as HTMLTextAreaElement
  outputTextarea = document.getElementById('output') as HTMLTextAreaElement
  runBtn = document.getElementById('runBtn') as HTMLButtonElement
  compileBtn = document.getElementById('compileBtn') as HTMLButtonElement
  statusDiv = document.getElementById('status') as HTMLDivElement

  // Set up event listeners
  runBtn.addEventListener('click', () => runCode(false))
  compileBtn.addEventListener('click', () => runCode(true))

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      runCode(false)
    }
  })

  // Initialize WCC Runner
  showStatus('Initializing compiler...', 'loading')
  setButtonsEnabled(false)

  wccRunner = new WccRunner()
  wccRunner.setConsoleOutFunction((text: string, isError: boolean) => {
    appendOutput(text, isError)
  })

  try {
    await wccRunner.setUp()
    isLoaded = true
    showStatus('Compiler ready!', 'success')
    setTimeout(() => hideStatus(), 2000)
    setButtonsEnabled(true)
  } catch (error) {
    showStatus(`Failed to initialize compiler: ${error}`, 'error')
    console.error('Initialization error:', error)
  }
}

// Set button enabled state
function setButtonsEnabled(enabled: boolean) {
  runBtn.disabled = !enabled
  compileBtn.disabled = !enabled
}

// Show status message
function showStatus(message: string, type: 'loading' | 'success' | 'error') {
  statusDiv.textContent = message
  statusDiv.className = `status ${type}`
  statusDiv.classList.remove('hidden')
}

// Hide status message
function hideStatus() {
  statusDiv.classList.add('hidden')
}

// Clear output
function clearOutput() {
  outputTextarea.value = ''
}

// Append text to output
function appendOutput(text: string, isError: boolean = false) {
  const prefix = isError ? '❌ ' : ''
  outputTextarea.value += prefix + text
  // Auto-scroll to bottom
  outputTextarea.scrollTop = outputTextarea.scrollHeight
}



// Compile source code
async function compile(sourceCode: string, extraOptions?: string[]): Promise<string | null> {
  const sourceName = 'main.c'
  await wccRunner.writeFile(sourceName, sourceCode)

  clearCompileErrors()
  const exitCode = await wccRunner.compile(sourceName, extraOptions)
  
  if (exitCode !== 0) {
    analyzeCompileErrors()
    return null
  }

  return 'a.wasm'
}

// Clear compile errors (simplified version of Util.clearCompileErrors)
function clearCompileErrors() {
  // In the simple version, we don't highlight errors in the editor
  // Just clear any previous error output
}

// Analyze compile errors (simplified version of Util.analyzeCompileErrors)
function analyzeCompileErrors() {
  // In the simple version, errors are just shown in the output textarea
  // The WCC Runner already outputs them via the console callback
}

// Main run/compile function
async function runCode(compileOnly: boolean) {
  if (!isLoaded) {
    showStatus('Compiler not ready yet', 'error')
    return
  }

  const sourceCode = sourceTextarea.value.trim()
  if (!sourceCode) {
    showStatus('Please enter some C code', 'error')
    setTimeout(() => hideStatus(), 3000)
    return
  }

  setButtonsEnabled(false)
  clearOutput()

  try {
    if (compileOnly) {
      showStatus('Compiling...', 'loading')
      
      // Compile to object file for disassembly
      const objFn = 'main.o'
      const compiledPath = await compile(sourceCode, ['-c', '-o', objFn])
      
      if (compiledPath == null) {
        showStatus('Compilation failed', 'error')
        return
      }

      // Disassemble the compiled object
      const compiledCode = await wccRunner.readFile(objFn)
      if (compiledCode) {
        appendOutput('=== WebAssembly Disassembly ===\n')
        const disWasm = new DisWasm(compiledCode.buffer)
        disWasm.setLogFunc(s => appendOutput(s + '\n'))
        disWasm.dump()
      }
      
      showStatus('Compilation successful!', 'success')
    } else {
      showStatus('Compiling and running...', 'loading')
      
      // Compile to executable
      const compiledPath = await compile(sourceCode)
      if (compiledPath == null) {
        showStatus('Compilation failed', 'error')
        return
      }

      // Run the compiled WebAssembly
      const args = ['a.wasm']
      
      appendOutput('=== Program Output ===\n')
      await wccRunner.runWasi(compiledPath, args)
      
      showStatus('Execution completed!', 'success')
    }
  } catch (error) {
    appendOutput(`\n❌ Error: ${error}\n`, true)
    showStatus('Operation failed', 'error')
    console.error('Execution error:', error)
  } finally {
    await wccRunner.clearTemporaries()
    setButtonsEnabled(true)
    setTimeout(() => hideStatus(), 3000)
  }
}

// Initialize when page loads
window.addEventListener('load', init) 