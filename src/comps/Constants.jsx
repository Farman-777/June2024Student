const Constants = {

    Regex: {
        ALPHABETS_ONLY: "[^a-zA-Z]+",
        NUMBERS_ONLY: "[^0-9]+",
        NUMBERS_WITH_DECIMAL_ONLY: "[^0-9\\.]+",
        ALPHABETS_WITH_SPACE: "[^a-zA-Z\\s]+",
        ALPHANUMERIC_ONLY: "[^a-zA-Z0-9]+",
        ALPHANUMERIC_WITH_SPACE: "[^a-zA-Z0-9\\s]+",
        ALPHANUMERIC_WITH_SYMBOL: "[^a-zA-Z0-9\\s!@#$&_+%*{}[]()\\\\\\/\\-\\.\\(\\):]+",
        NUMBERS_WITH_HYPHEN: "[^0-9-]",
        ONE_NUMBER_ONE_ALPHABET_EIGHT_CHARACTERS: "(?=.*\d)(?=.*[a-zA-Z]).{8,}",
        PAN_CARD_ONLY: "/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/",
        IFSC_CODE: "[^A-Z]{4}0[A-Z0-9]{6}",
        DATE_DD_MM_YYYY: "^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$",
        PERCENTAGE_WITH_TWO_DECIMAL_VALUES: "/(^100([.]0{1,2})?)$|(^\d{1,2}([.]\d{1,2})?)$/",
    },
    PATTERN: {
        Mobile_No:"[1-9]{1}[0-9]{9}",
        ALPHABETS_ONLY: "^[a-zA-Z]+$",
        NUMBERS_ONLY: "^[0-9]+$",
        NUMBERS_WITH_DECIMAL_ONLY: "^\\d+(\\.\\d+)?$",
        ALPHABETS_WITH_SPACE: "^[a-zA-Z\\s]+$",
        ALPHANUMERIC_ONLY: "^[a-zA-Z0-9]+$",
        ALPHANUMERIC_WITH_SPACE: "[a-zA-Z0-9\\s]+",
        ALPHANUMERIC_WITH_SYMBOL: "^[a-zA-Z0-9\\s!@#$&_+%*{}[\\]()\\/\\-.:]+$",
        NUMBERS_WITH_HYPHEN: "^[0-9\\-]+$",
        ONE_NUMBER_ONE_ALPHABET_EIGHT_CHARACTERS: "^(?=.*\\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8}$",
        PAN_CARD_ONLY: "^[A-Z]{5}[0-9]{4}[A-Z]$",
        IFSC_CODE: "^[A-Za-z]{4}[0][A-Za-z0-9]{6}$",
        DATE_DD_MM_YYYY: "^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-([0-9]{4})$",
        PERCENTAGE_WITH_TWO_DECIMAL_VALUES: "^\\d+(\\.\\d{1,2})?%?$"
    },
    MIME_TYPES: {
        PDF: 'pdf',
        JPG: 'jpg',
        JPEG: 'jpeg',
        PNG: 'png',
        DOC: 'doc',
        DOCX: 'docx',
        XLSX: 'xlsx',
        XLS: 'xls'
    },
}

export default Constants;