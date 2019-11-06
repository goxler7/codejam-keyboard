import './assets/scss/main.scss'

let wrapper = document.createElement('div');
wrapper.className = 'wrapper';

let siteTitle = document.createElement('h1');
siteTitle.className = 'site_title';
siteTitle.innerText = 'Virtual keyboard';

let textArea = document.createElement('textarea');
textArea.className = 'textarea';
textArea.setAttribute('disabled', true);

document.body.append(wrapper);
wrapper.append(siteTitle);
siteTitle.after(textArea);

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: {
      'Backquote': ['`', 'ё', '~', 'Ё'],
      'Digit1': ['1', '1', '!', '!'],
      'Digit2': ['2', '2', '@', '"'],
      'Digit3': ['3', '3', '#', '№'],
      'Digit4': ['4', '4', '$', ';'],
      'Digit5': ['5', '5', '%', '%'],
      'Digit6': ['6', '6', '^', ':'],
      'Digit7': ['7', '7', '&', '?'],
      'Digit8': ['8', '8', '*', '*'],
      'Digit9': ['9', '9', '(', '('],
      'Digit0': ['0', '0', ')', ')'],
      'Minus': ['-', '-', '_', '_'],
      'Equal': ['=', '=', '+', '+'],
      'Backspace': ['Backspace', 'Backspace', 'Backspace', 'Backspace'],
      'Tab': ['Tab','Tab','Tab','Tab'],
      'KeyQ': ['q','й','Q','Й'],
      'KeyW': ['w','ц','W','Ц'],
      'KeyE': ['e','у','E','У'],
      'KeyR': ['r','к','R','К'],
      'KeyT': ['t','е','T','Е'],
      'KeyY': ['y','н','Y','Н'],
      'KeyU': ['u','г','U','Г'],
      'KeyI': ['i','ш','I','Ш'],
      'KeyO': ['o','щ','O','Щ'],
      'KeyP': ['p','з','P','З'],
      'BracketLeft': ['[','х','{','Х'],
      'BracketRight': [']','ъ','}','Ъ'],
      'Backslash': ['\\','\\','|','/'],
      'CapsLock': ['CapsLock','CapsLock','CapsLock','CapsLock'],
      'KeyA': ['a','ф','A','Ф'],
      'KeyS': ['s','ы','S','Ы'],
      'KeyD': ['d','в','D','В'],
      'KeyF': ['f','а','F','А'],
      'KeyG': ['g','п','G','П'],
      'KeyH': ['h','р','H','Р'],
      'KeyJ': ['j','о','J','О'],
      'KeyK': ['k','л','K','Л'],
      'KeyL': ['l','д','L','Д'],
      'Semicolon': [';','ж',':','Ж'],
      'Quote': ["'",'э','"','Э'],
      'Enter': ['Enter','Enter','Enter','Enter'],
      'ShiftLeft': ['Shift','Shift','Shift','Shift'],
      'KeyZ': ['z','я','Z','Я'],
      'KeyX': ['x','ч','X','Ч'],
      'KeyC': ['c','с','C','С'],
      'KeyV': ['v','м','V','М'],
      'KeyB': ['b','и','B','И'],
      'KeyN': ['n','т','N','Т'],
      'KeyM': ['m','ь','M','Ь'],
      'Comma': [',','б','<','Б'],
      'Period': ['.','ю','>','Ю'],
      'Slash': ['/','.','?',','],
      'ArrowUp': ['↑','↑','↑','↑'],
      'ShiftRight': ['Shift','Shift','Shift','Shift'],
      'ControlLeft': ['Ctrl','Ctrl','Ctrl','Ctrl'],
      'MetaLeft': ['Win','Win','Win','Win'],
      'AltLeft': ['Alt','Alt','Alt','Alt'],
      'Space': ['___','___','___','___'],
      'ChangeLang': ['','','',''],
      'AltRight': ['Alt','Alt','Alt','Alt'],
      'ArrowLeft': ['←','←','←','←'],
      'ArrowDown': ['↓','↓','↓','↓'],
      'ArrowRight': ['→','→','→','→'],
      'ControlRight': ['Ctrl','Ctrl','Ctrl','Ctrl']
    }
  },

  properties: {
    capsLock: false,
    langEng: false,
    isShifted: false
  },

  init() {
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add('kboard');
    this.elements.keysContainer.classList.add('keys');

    this.elements.main.append(this.elements.keysContainer);
    this.elements.keysContainer.append(this._createKeys());
    this._createKeyboardListener();

    return this.elements.main;
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const kboard = this.elements.keys;

    for (let k in kboard) {
      const keyElement = document.createElement('div');
      const keyElementInner = `<span class='lang off'>
                                  <span class='case off'>${kboard[k][2]}</span>
                                  <span class='case'>${kboard[k][0]}</span>
                                </span>
                                <span class='lang'>
                                  <span class='case off'>${kboard[k][3]}</span>
                                  <span class='case'>${kboard[k][1]}</span>
                                </span>`      
                                
      keyElement.insertAdjacentHTML('beforeend', keyElementInner);
      keyElement.classList.add('key', k);

      keyElement.addEventListener('click', () => {
        keyElement.classList.add('key-pressed');
        setTimeout(() => keyElement.classList.remove('key-pressed'), 100);
      });

      switch (k) {
        case 'Backspace':
          keyElement.addEventListener('click', () => {
            textArea.value = textArea.value.slice(0, -1);
          });
          break;
        case 'Tab':
          keyElement.addEventListener('click', () => {
            textArea.value += '\t';
          });
          break;
        case 'CapsLock':
          keyElement.addEventListener('click', () => {
            this._toggleCapsLock();
          });
          break;
        case 'Enter':
          keyElement.addEventListener('click', () => {
            textArea.value += '\n';
          });
          break;
        case 'Space':
          keyElement.addEventListener('click', () => {
            textArea.value += ' ';
          });
          break;
        case 'ShiftLeft':
          break;
        case 'ShiftRight':
          break;
        case 'AltLeft':
          keyElement.addEventListener('click', (e) => {
            e.ctrlKey ? this._toggleLang() : false;
          });
          break;
        case 'ChangeLang':
          keyElement.addEventListener('click', (e) => {
            this._toggleLang()
          });
          break;
        case 'AltRight':
          keyElement.addEventListener('click', (e) => {
            e.ctrlKey ? this._toggleLang() : false;
          });
          break;
        case 'ControlLeft':
          keyElement.addEventListener('click', (e) => {
            e.altKey ? this._toggleLang() : false;
          });
          break;
        case 'ControlRight':
          keyElement.addEventListener('click', (e) => {
            e.altKey ? this._toggleLang() : false;
          });
          break;
        case 'MetaLeft':
          break;
        default:
          keyElement.addEventListener('click', (e) => {
            if (this.properties.langEng && !this.properties.capsLock) {
              e.shiftKey ? textArea.value += kboard[k][2] : textArea.value += kboard[k][0];
            } else if (!this.properties.langEng && !this.properties.capsLock) {
              e.shiftKey ? textArea.value += kboard[k][3] : textArea.value += kboard[k][1];
            } else if (this.properties.langEng && this.properties.capsLock) {
              e.shiftKey ? textArea.value += kboard[k][0] : textArea.value += kboard[k][2];
            } else {
              e.shiftKey ? textArea.value += kboard[k][1] : textArea.value += kboard[k][3];
            }
          });
          break;
      }
      fragment.append(keyElement);
    }

    window.addEventListener('keydown', (e) => {
      this.elements.keysContainer.querySelectorAll('.key').forEach(k => {
        if (k.classList.contains(e.code)) {
          k.classList.add('key-pressed');
        }
      })
    })

    window.addEventListener('keyup', (e) => {
      this.elements.keysContainer.querySelectorAll('.key').forEach(k => {
        if (k.classList.contains(e.code)) {
          k.classList.remove('key-pressed');
        }
      })
    })

    return fragment;
  },

  _createKeyboardListener() {
    window.addEventListener('keydown', (e) => {
      if (e.metaKey) {
        return;
      }
      
      if (e.altKey && e.ctrlKey) {
        this._toggleLang();
      }

      if (e.shiftKey) {
        if (!this.properties.isShifted) {
          this.elements.keysContainer.querySelectorAll('.case').forEach(k => k.classList.toggle('off'));
        }
        !this.properties.isShifted ? this.properties.isShifted = true : false;
      }

      e.preventDefault();

      switch (e.code) {
        case 'Backspace':
          textArea.value = textArea.value.slice(0, -1);
          break;
        case 'Tab':
          textArea.value += '\t';
          break;
        case 'CapsLock':
          this._toggleCapsLock();
          break;
        case 'Space':
          textArea.value += ' ';
          break;
        case 'Enter':
          textArea.value += '\n';
          break;
        case 'ShiftLeft':
          break;
        case 'ShiftRight':
          break;
        case 'AltLeft':
          break;
        case 'AltRight':
          break;
        case 'ControlLeft':
          break;
        case 'ControlRight':
          break;
        default:
          if (this.properties.langEng && !this.properties.capsLock) {
            e.shiftKey ? textArea.value += this.elements.keys[e.code][2] : textArea.value += this.elements.keys[e.code][0];
          } else if (!this.properties.langEng && !this.properties.capsLock) {
            e.shiftKey ? textArea.value += this.elements.keys[e.code][3] : textArea.value += this.elements.keys[e.code][1];
          } else if (this.properties.langEng && this.properties.capsLock) {
            e.shiftKey ? textArea.value += this.elements.keys[e.code][0] : textArea.value += this.elements.keys[e.code][2];
          } else {
            e.shiftKey ? textArea.value += this.elements.keys[e.code][1] : textArea.value += this.elements.keys[e.code][3];
          }
          break;
      }
    })

    window.addEventListener('keyup', (e) => {
      if (!e.shiftKey && e.key === 'Shift') {
        if (this.properties.isShifted) {
          this.elements.keysContainer.querySelectorAll('.case').forEach(k => k.classList.toggle('off'));
        }
        this.properties.isShifted ? this.properties.isShifted = false : false;
      }
    })
  },

  _toggleCapsLock() {
    this.properties.capsLock === false ? this.properties.capsLock = true : this.properties.capsLock = false;
    this.elements.keysContainer.querySelector('.CapsLock').classList.toggle('active');
    this.elements.keysContainer.querySelectorAll('.case').forEach(k => k.classList.toggle('off'));
  },

  _toggleLang() {
    this.properties.langEng === false ? this.properties.langEng = true : this.properties.langEng = false;
    this.elements.keysContainer.querySelectorAll('.lang').forEach(k => k.classList.toggle('off'));
    this.elements.keysContainer.querySelector('.ChangeLang').classList.toggle('eng');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  wrapper.append(Keyboard.init());
})