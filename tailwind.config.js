module.exports = {
    mode: 'jit',
    content: ["./src/**/*.{html,js,ts}"],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }
  