const js = require('@eslint/js');

module.exports = [
    {
        ignores: [
            'node_modules/**',
            'allure-results/**',
            'allure-report/**',
            'reports/**',
            'screenshots/**',
            'videos/**',
        ],
    },

    js.configs.recommended,

    {
        files: ['eslint.config.js'],

        languageOptions: {
            globals: {
                require: 'readonly',
                module: 'readonly',
                console: 'readonly',
            },
        },
    },

    {
        files: ['src/**/*.js'],

        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'commonjs',

            globals: {
                browser: 'readonly',
                $: 'readonly',
                $$: 'readonly',

                describe: 'readonly',
                it: 'readonly',
                before: 'readonly',
                beforeEach: 'readonly',
                after: 'readonly',
                afterEach: 'readonly',

                expect: 'readonly',
                console: 'readonly',
            },
        },

        rules: {
            'no-unused-vars': 'warn',
            'no-undef': 'error',
        },
    },
];
