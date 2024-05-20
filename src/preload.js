const { contextBridge } = require('electron')
const { ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electron', {
    answer: (answer) => ipcRenderer.send('answer', answer),
    start: () => ipcRenderer.send('start'),
    onNextQuestion:  (callback) => ipcRenderer.on('onNextQuestion', (_event, question) => callback(question)),
    onResult: (callback) => ipcRenderer.on('onResult', (_event, CorrectAnswers, IncorrectAnswers) => callback(CorrectAnswers, IncorrectAnswers)),
})