
// Неметаллы всегда образуют кислоты? (Ответ: Нет, они могут образовывать основания.)
// Металлы всегда образуют оксиды? (Ответ: Нет, некоторые металлы образуют гидроксиды.)
// Неметаллы всегда образуют соли? (Ответ: Нет, они могут образовывать кислоты.)
// Металлы всегда образуют амфотерные оксиды? (Ответ: Нет, не все металлы.)
// Неметаллы всегда образуют молекулы? (Ответ: Нет, они могут образовывать атомы.)

// К четвертой группе относится элемент германий? (Ответ: Да.)
// Условная граница между металлическими и неметаллическими элементами проходит по диагонали? (Ответ: Да.)
// Металлургический процесс включает в себя восстановление ионов металла? (Ответ: Да.)
// Пирометаллургия - это процесс получения металлов из их соединений при высокой температуре? (Ответ: Да.)
// В пирометаллургии используются как восстановители, так и окислители? (Ответ: Да.)
// При алюмотермии используется металл алюминий? (Ответ: Да.)
// В гидрометаллургии получают металлы из растворов их соединений? (Ответ: Да.)
// В электрометаллургии используется процесс электролиза расплавов? (Ответ: Да.)
// При электролизе восстановителем является катод? (Ответ: Да.)

const Questions = [
  {
      question: "Все металлы обладают высокой электропроводностью?",
      answer: false,
  },

  {
      question: "Неметаллы могут образовывать катионы?",
      answer: false,
  },

  {
      question: "Все металлы имеют высокую температуру плавления?",
      answer: false,
  },

  {
      question: "Металлы могут образовывать молекулы?",
      answer: false,
  },

  {
      question: "Все металлы имеют высокую плотность?",
      answer: false,
  },

  {
      question: "В гидрометаллургии получают металлы из растворов их соединений?",
      answer: false,
  },

  {
      question: "В электрометаллургии используется процесс электролиза расплавов?",
      answer: false,
  },  

  {
      question: "При электролизе восстановителем является катод?",
      answer: false,
  },

  {
      question: "В пирометаллургии используется как восстановители, так и окислители?",
      answer: false,
  },

  {
      question: "При алюмотермии используется металл алюминий?",
      answer: false,
  },

  {
      question: "Металлургический процесс включает в себя восстановление ионов металла?",
      answer: false,
  },

  {
      question: "Условная граница между металлическими и неметаллическими элементами проходит по диагонали?",
      answer: false,
  },

  {
      question: "К четвертой группе относится элемент германий?",
      answer: false,
  },

];

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

let CorrectAnswers = 0;
let IncorrectAnswers = 0;
let CurrentQuestionIndex = 0;

const createWindow = () => {

  const mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('src/index.html')
  mainWindow.webContents.openDevTools()

  return mainWindow
}

function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

app.whenReady().then(() => {
  const win = createWindow();

  ipcMain.on('answer', (event, answer) => {
    if (answer === Questions[CurrentQuestionIndex].answer) {
      CorrectAnswers++;
    } else {
      IncorrectAnswers++;
    }

    if (CurrentQuestionIndex === Questions.length - 1) {
      win.webContents.send('onResult', CorrectAnswers, IncorrectAnswers);
      return;
    }

    CurrentQuestionIndex++;
    win.webContents.send('onNextQuestion', Questions[CurrentQuestionIndex].question);
  })

  ipcMain.on('start', (event, data) => {
    CorrectAnswers = 0;
    IncorrectAnswers = 0;
    CurrentQuestionIndex = 0;
    shuffle(Questions);

    win.webContents.send('onNextQuestion', Questions[CurrentQuestionIndex].question);
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})