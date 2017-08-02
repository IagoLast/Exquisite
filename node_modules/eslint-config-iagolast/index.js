module.exports = {
    extends: 'eslint:recommended',
    'rules': {
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'complexity': [
            'error',
            2
        ],
        'max-nested-callbacks': [
            'error',
            4,
        ],
        'max-statements': [
            'error',
            15,
        ],
        'max-lines': [
            'error',
            300,
        ]
    }
};