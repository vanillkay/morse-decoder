import React from "react";
import MorseLetter from "../components/MorseLetter/MorseLetter.js";
import Space from "../components/Space/Space";

class MorseCode{
    static code = {
        ukrCode: {
            'А': '*-',
            'Б': '-***',
            'В': '*--',
            'Г': '****',
            'Ґ': '--*',
            'Д': '-**',
            'Е': '*',
            'Є': '**-**',
            'Ж': '***-',
            'З': '--**',
            'И': '-*--',
            'І': '**',
            'Ї': '*---*',
            'Й': '*---',
            'К': '-*-',
            'Л': '*-**',
            'М': '--',
            'Н': '-*',
            'О': '---',
            'П': '*--*',
            'Р': '*-*',
            'С': '***',
            'Т': '-',
            'У': '**-',
            'Ф': '**-*',
            'Х': '----',
            'Ц': '-*-*',
            'Ч': '---*',
            'Ш': '--*-',
            'Щ': '--*--',
            'Ю': '**--',
            'Я': '*-*-',
            'Ь': '-**-'
        },
        rusCode:  {
            'А': '*-',
            'Б': '-***',
            'В': '*--',
            'Г': '--*',
            'Д': '-**',
            'Е': '*',
            'Ж': '***-',
            'З': '--**',
            'И': '**',
            'Й': '*---',
            'К': '-*-',
            'Л': '*-**',
            'М': '--',
            'Н': '-*',
            'О': '---',
            'П': '*--*',
            'Р': '*-*',
            'С': '***',
            'Т': '-',
            'У': '**-',
            'Ф': '**-*',
            'Х': '****',
            'Ц': '-*-*',
            'Ч': '---*',
            'Ш': '----',
            'Щ': '--*-',
            'Ъ': '*--*-*',
            'Ы': '-*--',
            'Ь': '-**-',
            'Э': '***-***',
            'Ю': '**--',
            'Я': '*-*-',
        },
        engCode: {
            'A': '*-',
            'B': '-***',
            'C': '-*-*',
            'D': '-**',
            'E': '*',
            'F': '**-*',
            'G': '--*',
            'H': '****',
            'I': '**',
            'J': '*---',
            'K': '-*-',
            'L': '*-**',
            'M': '--',
            'N': '-*',
            'O': '---',
            'P': '*--*',
            'Q': '--*-',
            'R': '*-*',
            'S': '***',
            'T': '-',
            'U': '**-',
            'V': '***-',
            'W': '*--',
            'X': '-**-',
            'Y': '-*--',
            'Z': '--**'
        },
        numbers: {
            '0': '-----',
            '1': '*----',
            '2': '**---',
            '3': '***--',
            '4': '****-',
            '5': '*****',
            '6': '-****',
            '7': '--***',
            '8': '---**',
            '9': '----*'
        },
        symbols: {
            '?': '**--**',
            '!': '--**--',
            ',': '*-*-*-',
            '.': '******',
            ';': '-*-*-*',
            ':': '---***',
            '№': '-**-*',
            '+': '*-*-*',
            '-': '-****-',
            '/': '------',
            '"': '*-**-*',
            '(': '-*--*-',
            ')': '-*--*-'
        }
    }

    specialSymbols = ['?', '!', ',', '.', ';', ':', '№', '+', '-', '/', '"', '(', ')'];

    //Метод кодировки в код Морзе
    translate(word, lang,  color){
        return word.split('').map((item, index) => {
            if (this.specialSymbols.includes(item)){
                return <MorseLetter key={index} code={MorseCode.code.symbols[item]} color={color}/>
            }
            return <MorseLetter key={index} code={MorseCode.code[lang][item.toUpperCase()]} color={color}/>
        })
    }

    translateText(text, lang, color){
        return text.map((item, index) => {
            if (this.specialSymbols.includes(item)){
                return <MorseLetter key={index} mb={'10px'} code={MorseCode.code.symbols[item]} color={color}/>
            }
            if (item === 'Space') return <div key={index} className={'endWord'}>/</div>;
            return <MorseLetter key={index} mb={'10px'} code={MorseCode.code[lang][item.toUpperCase()]} color={color}/>
        })
    }

    //Метод декодировки из кода Морзе
    decode(text, lang){
        return text.map((item, index ) => {
            for (let key in MorseCode.code[lang] ){
                if ( MorseCode.code[lang][key] === item) return key.toLowerCase();
            }
            if (item === '/') return <Space key={index} />;
            return 'error';
        })
    }

    //Метод для удаления объекта из памяти
    delete(){
        delete this;
    }
}

export default MorseCode;