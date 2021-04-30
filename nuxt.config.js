export default {
  ssr: false,
  target: 'static',
  srcDir: 'src/',
  head: {
    title: 'coaching',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
  },
  router: {
    middleware: ['auth']
  },
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/sass/style.sass'
  ],
  plugins: [
    '@/plugins/element-ui',
    { src: '~/plugins/axios.js', ssr:false }
  ],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
    'nuxt-typed-vuex',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/proxy',
  ],
  build: {
    transpile: [/^element-ui/,/typed-vuex/],
  },
  axios: {
    proxy: true
  },
  proxy:{
    '/api':{
      target:'http://localhost:3001',
      pathRewrite: {
        '^/api/*': '/'
      }
    }
  },

  publicRuntimeConfig: {
    baseURL: process.env.BASE_SERVICE
  },
  
  auth: {
    login:'/dashbord',
    logout:'/login',
    home:'/',
    callback: false,
    token: {
      property: 'UTFiQBvnADHzU6dAYwlA0A',
    },
    user: {
      property: 'test@example.com',
    },
    strategies:{
      local:{
        endpoints:{
          login: { url:'http://localhost:3001/api/v1/auth/sign_in', method:'post', propertyName:false },
          logout: false,
          user: false
        }
      }
    }
  },
}
