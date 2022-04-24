import * as $ from 'jquery'
import Post from "@models/Post";
import json from './assets/json.json'
import xml from './assets/data.xml'
import WebpackLogo from './assets/webpack-logo.png'
import './babel'
import './styles/styles.css'
import './styles/less.less'
import './styles/scss.scss'

const post = new Post('Webpack Post title', WebpackLogo)

$('pre').addClass('code').html(post.toString())

// console.log('JSON:', json)
// console.log('XML:', xml)