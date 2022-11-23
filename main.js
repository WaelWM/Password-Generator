const flags = {
    uppercase: false,
    numbers: false,
    symbols: false,
    space: false,
    length: 5
}

const selectors = {
    copy: 'copy',
    checkbox: 'checkbox',
    slider: 'slider',
    button: 'button',
    sliderValue: document.querySelector('.value'),
    input: document.querySelector('input[type="text"]')
}

const generatePassword = () => {
    const defaultCharacters = 'abcdefghijklmnopqrstuvwxyz'
    const characters = {
        uppercase: defaultCharacters.toUpperCase(),
        numbers: '0123456789',
        symbols: '~!@-#$*^()%',
        space: '  '
    }

    const characterList = [
        defaultCharacters,
        ...flags.uppercase ? characters.uppercase : [],
        ...flags.numbers ? characters.numbers : [],
        ...flags.symbols ? characters.symbols : [],
        ...flags.space ? characters.space : []
    ].join('')

    return Array.from({ length: flags.length }, () => Math.floor(Math.random() * characterList.length))
        .map(number => characterList[number])
        .join('')
}

document.querySelector('#app').addEventListener('click', event => {
    switch (event.target.dataset.jsSelector) {
        case selectors.copy:
            const dummy = document.createElement('textarea')

            document.body.appendChild(dummy)

            dummy.value = selectors.input.value
            dummy.select()

            document.execCommand('copy')
            document.body.removeChild(dummy)
        break;

        case selectors.checkbox:
            flags[event.target.control.id] = !event.target.control.checked
        break;

        case selectors.slider:
            const value = event.target.valueAsNumber

            selectors.sliderValue.innerText = value
            flags.length = value
        break;

        case selectors.button:
            selectors.input.value = generatePassword()
        break;
    }
})