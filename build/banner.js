'use strict'

const year = new Date().getFullYear()

function getBanner(pluginFilename) {
  return `/*!
  * Bootstrap Vertical Menu v0.0.2 (https://iqbalfn.github.io/bootstrap-vertical-menu/)
  * Copyright 2019 Iqbal Fauzi
  * Licensed under MIT (https://github.com/iqbalfn/bootstrap-vertical-menu/blob/master/LICENSE)
  */`
}

module.exports = getBanner
