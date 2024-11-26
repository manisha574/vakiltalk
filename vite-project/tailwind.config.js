
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      height: {
        '524': '524px',
        '60': '60px',
        '11': '11px',
        '208': '225px',
        '180': '180px',
        '98': '98px',
        '250': '250px',
        '109': '109px',
        '720': '720px',   
        
      },
      width: {
        '153': '153px',
        '59.66': '59.66px',
        '11': '11px',
        '325': '330px',
        '298': '298px',
        '123.21': '123.21px',
        '500': '500px',
        '1200':'1200px',
      },
      fontFamily: {
        viga: ['Viga', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      },
      
      backgroundSize: {
        'cover': 'cover',
        'contain': 'contain',
      },
      boxShadow: {
        'text': '0px 4px 4px rgba(0, 0, 0, 0.25)', // Custom shadow
      },
      colors: {
        customBlue: '#5B5AFF',
        darkindigo: 'rgba(96, 70, 252, 1)',
        lightindigo: 'rgba(96, 70, 252, 0.1)',
        lightyellow: 'rgba(255, 248, 228, 1)',
        lightred: ' rgba(255, 173, 173, 0.2)',
        lightgreen: ' rgba(84, 221, 0, 0.2)',
        lightorange: 'rgba(255, 189, 140, 0.2)',
        nyellow: ' rgba(230, 221, 0, 1)',
        nred: ' rgba(255, 173, 173, 1)',
        ngreen: '  rgba(186, 255, 143, 1)',
        norange: ' rgba(255, 189, 140, 1)',
        sblue: 'rgba(57, 42, 150, 1)',
        fblue: 'rgba(18, 13, 48, 1)',
        loblue: 'rgba(2, 0, 213, 1)',
        liloblue:'rgba(91, 90, 255, 1)'

      },
      borderRadius: {
        '20': '20px',
        '10': '10px',
        '19': '19px',
        '30': '30px',
      },
      fontSize: {
        '10': '10px',
        '7': '7px',
        '34': '34px',
        '22': '22px',
        '18':'18px'
        
      },
      lineHeight:
      {
        '18': '18px',
        '90': '90',
        '58': '58px',
        '44': '44px',
        '18px':'18px',
      },
      margin: {
        '73': '73px'
      },
      
      boxShadow: {
        'custom': ' 0px 4px 4px 0px rgba(0, 0, 0, 0.1)',
        'custom-top': '0 -4px 6px -1px rgba(0, 0, 255, 0.1), 0 -2px 4px -1px rgba(0, 0, 255, 0.06)',

      },
      backgroundImage: {
        'bgholo': "url('../Image/background.png')",
        'bgtri':`url('../Image/buisness.png')`
      },
      
     
     
      
    },

    
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow': {
          textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', // Custom text shadow
        },
      });
    },
  ],
};

