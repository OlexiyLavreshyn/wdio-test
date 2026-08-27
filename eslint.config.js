const js = require('@eslint/js');

module.exports = [
    {
        ignores: [
            'node_modules/**',
            'coverage/**',
            'allure-results/**',
            'allure-report/**',
            'reports/**',
        ],
    },
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'commonjs',
            globals: {
                console: 'readonly',
                process: 'readonly',
                require: 'readonly',
                module: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                fetch: 'readonly',
            },
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-undef': 'error',
        },
    },
];
