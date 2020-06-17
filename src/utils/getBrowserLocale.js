export default function getBrowserLocale() {
    if (navigator.languages !== undefined) {
        if (navigator.languages.includes('ru')) {
            return 'ru'
        } else { 
            return 'en'
        }
    } else {
        return 'en'
    }
}