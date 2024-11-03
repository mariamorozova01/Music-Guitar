const path = require('path'); // Модуль Node.js для работы с путями в файловой системе
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Плагин для автоматического создания HTML-файла с подключением собранных скриптов
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Плагин для извлечения CSS в отдельный файл

// Функция для настройки devServer (только если режим разработки)
const devServer = (isDev) => !isDev ? {} : { // Если isDev истинно, включаем devServer
  devServer: {
    open: true, // Автоматически открывает браузер после сборки
    hot: true, // Включает "горячую перезагрузку" для обновления страницы без полной перезагрузки
    port: 8080, // Устанавливает порт сервера на 8080
  }
};

// Экспортируем конфигурацию как функцию, принимающую параметр `{ develop }`
module.exports = ({ develop }) => ({
  // Устанавливаем режим сборки в зависимости от develop: 'development' для разработки или 'production' для продакшн
  mode: develop ? 'development' : 'production', 

  entry: './src/index.js', // Главный (входной) файл JavaScript для начала сборки

  output: {
    path: path.resolve(__dirname, 'dist'), // Папка для сохранения выходных файлов сборки
    filename: 'bundle.js', // Имя собранного JavaScript-файла
    clean: true, // Удаляет старые файлы в папке dist перед новой сборкой
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // HTML-шаблон для создания итогового HTML-файла
    }),
    new MiniCssExtractPlugin({
        filename: './styles/main.css' // Имя выходного CSS-файла
    })
  ],

  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Регулярное выражение для поиска файлов изображений
        type: 'asset/inline',
      },
      {
        test: /\.html$/i, // Регулярное выражение для поиска HTML-файлов
        loader: 'html-loader', // Использует html-loader для обработки HTML-файлов и их импорта в JavaScript
      },
      {
        test: /\.css$/i, // Регулярное выражение для поиска CSS-файлов
        use: [
            MiniCssExtractPlugin.loader, 'css-loader' // Извлекает CSS в отдельный файл и обрабатывает его
        ]
      },
      {
        test: /\.scss$/i, // Регулярное выражение для поиска SCSS-файлов
        use: [
            MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' // Обрабатывает SCSS-файлы, компилирует их в CSS и извлекает в отдельный файл
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  
  ...devServer(develop), // Включает настройки devServer, если режим разработки
});
