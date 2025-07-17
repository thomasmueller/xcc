import {Util} from './util'
import {WccRunner} from './wcc_runner'

// DOM elements
let sourceTextarea: HTMLTextAreaElement
let outputTextarea: HTMLTextAreaElement
let runBtn: HTMLButtonElement
let statusDiv: HTMLDivElement

// WCC Runner instance
let wccRunner: WccRunner
let isLoaded = false

// Initialize the application
async function init() {
  // Get DOM elements
  sourceTextarea = document.getElementById('cSourceCode') as HTMLTextAreaElement
  outputTextarea = document.getElementById('cOutput') as HTMLTextAreaElement
  runBtn = document.getElementById('cRunButton') as HTMLButtonElement
  statusDiv = document.getElementById('status') as HTMLDivElement

  // Set up event listeners
  runBtn.addEventListener('click', () => runCode())

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      runCode()
    }
  })

  // Initialize WCC Runner
  showStatus('Initializing compiler...', 'loading')
  setButtonsEnabled(false)

  wccRunner = new WccRunner()
  wccRunner.setConsoleOutFunction((text: string, isError: boolean) => {
    if (!isError) {
      appendOutput(text, isError);
    }
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
  const prefix = isError ? 'ERROR ' : ''
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

// Main run function
async function runCode() {
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
    showStatus('Compiling and running...', 'loading')
    
    // Compile to executable
    const compiledPath = await compile(sourceCode)
    if (compiledPath == null) {
      showStatus('Compilation failed', 'error')
      return
    }

    // Run the compiled WebAssembly
    const args = ['a.wasm']
    
    await wccRunner.runWasi(compiledPath, args)
    
    showStatus('Execution completed!', 'success')
  } catch (error) {
    appendOutput(`\nERROR: ${error}\n`, true)
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