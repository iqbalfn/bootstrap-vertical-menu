/**
 * --------------------------------------------------------------------------
 * Bootstrap Vertical Menu (v0.0.3): vertical-menu.js
 * --------------------------------------------------------------------------
 */

import $ from 'jquery'
import Util from './util'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME                = 'vertmenu'
const VERSION             = '0.0.3'
const DATA_KEY            = 'bs.vertmenu'
const EVENT_KEY           = `.${DATA_KEY}`
const DATA_API_KEY        = '.data-api'
const JQUERY_NO_CONFLICT  = $.fn[NAME]

const ARROW_LEFT_KEYCODE       = 37 // KeyboardEvent.which value for left arrow key
const ARROW_UP_KEYCODE         = 38 // KeyboardEvent.which value for up arrow key
const ARROW_RIGHT_KEYCODE      = 39 // KeyboardEvent.which value for right arrow key
const ARROW_DOWN_KEYCODE       = 40 // KeyboardEvent.which value for down arrow key

const Default = {
  toggle : false
}

const DefaultType = {
  toggle : 'boolean'
}

const Event = {
  SHOW              : `show${EVENT_KEY}`,
  SHOWN             : `shown${EVENT_KEY}`,
  HIDE              : `hide${EVENT_KEY}`,
  HIDDEN            : `hidden${EVENT_KEY}`,
  CLICK_DATA_API    : `click${EVENT_KEY}${DATA_API_KEY}`,
  KEYDOWN_DATA_API  : `keydown${EVENT_KEY}${DATA_API_KEY}`,
}

const ClassName = {
  COLLAPSE      : 'collapse',
  COLLAPSING    : 'collapsing',
  COLLAPSED     : 'collapsed',
  MENU          : 'vertical-menu',
  MENU_PARENT   : 'vertical-menu-parent',
  SHOW          : 'show',
}

const Selector = {
  DATA_TOGGLE   : '[data-toggle="vertical-menu"]',
  MENU          : `.${ClassName.MENU}`
}

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class VerticalMenu {

    constructor(element, config) {
        this._isTransitioning = false
        this._element         = element
        this._config          = this._getConfig(config)
        this._parent          = element.parentNode;

        if (this._config.toggle)
            this.toggle()
    }

    // Getters

    static get VERSION() {
        return VERSION
    }

    static get Default() {
        return Default
    }

    // Public

    toggle() {
        if ($(this._parent).hasClass(ClassName.SHOW))
            this.hide()
        else
            this.show()
    }

    show() {
        if (this._isTransitioning || $(this._element).hasClass(ClassName.SHOW))
            return

        const startEvent = $.Event(Event.SHOW)
        $(this._element).trigger(startEvent)
        if (startEvent.isDefaultPrevented())
            return

        const dimension = 'height'

        $(this._element)
            .removeClass(ClassName.COLLAPSE)
            .addClass(ClassName.COLLAPSING)

        this._element.style[dimension] = 0
        $(this._parent).addClass(ClassName.SHOW)

        this._isTransitioning = true

        const complete = () => {
            $(this._element)
                .removeClass(ClassName.COLLAPSING)
                .addClass(ClassName.COLLAPSE)

            this._element.style[dimension] = ''

            this._isTransitioning = false

            $(this._element).trigger(Event.SHOWN)
        }

        const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1)
        const scrollSize = `scroll${capitalizedDimension}`
        const transitionDuration = Util.getTransitionDurationFromElement(this._element)

        $(this._element)
            .one(Util.TRANSITION_END, complete)
            .emulateTransitionEnd(transitionDuration)

        this._element.style[dimension] = `${this._element[scrollSize]}px`
    }

    hide() {
        if (this._isTransitioning || !$(this._parent).hasClass(ClassName.SHOW))
            return

        const startEvent = $.Event(Event.HIDE)
        $(this._element).trigger(startEvent)
        if (startEvent.isDefaultPrevented())
            return

        const dimension = 'height'

        this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`

        Util.reflow(this._element)

        $(this._element)
            .addClass(ClassName.COLLAPSING)
            .removeClass(ClassName.COLLAPSE)

        this._isTransitioning = true

        const complete = () => {
            this._isTransitioning = false
            $(this._parent)
                .removeClass(ClassName.SHOW)
            $(this._element)
                .trigger(Event.HIDDEN)
        }

        this._element.style[dimension] = ''
        const transitionDuration = Util.getTransitionDurationFromElement(this._element)

        $(this._element)
            .one(Util.TRANSITION_END, complete)
            .emulateTransitionEnd(transitionDuration)
    }

    dispose() {
        $.removeData(this._element, DATA_KEY)

        this._config          = null
        this._parent          = null
        this._element         = null
        this._isTransitioning = null
    }

    // Private

    _getConfig(config) {
        config = {
            ...Default,
            ...config
        }
        config.toggle = Boolean(config.toggle) // Coerce string values
        Util.typeCheckConfig(NAME, config, DefaultType)
        return config
    }

    // Static

    static _handleDownKey(event){
        //   a
        //      b
        //          c <--           ( you're here )
        //              d           ( 1 )
        //              d1
        //              d2
        //          c1              ( 2 )
        //          c2
        //      b1                  ( 3 )
        //      b2
        //   a1                     ( 4 )
        //   a2
        
        let target      = event.target
        let parent      = target.parentNode
        let siblingUl   = target.nextElementSibling
        let parentOpen  = parent.classList.contains(ClassName.SHOW)

        let next;

        // ( 1 )
        if(siblingUl && parentOpen)
            next = $(parent).find('> ul >li:first-child > a').get(0)

        // ( 2,3,4 )
        if(!next){
            // let find next menu item
            let cTarget = target
            while(true){
                let cParent  = cTarget.parentNode           // li
                let CPNext   = cParent.nextElementSibling   // li:next

                if(CPNext){
                    next = $(CPNext).children('a').get(0)
                    break
                }

                let cPParent = cParent.parentNode       // ul
                let cPPLi    = cPParent.parentNode      // li?

                if(cPPLi.tagName != 'LI' || cPPLi.classList.contains(ClassName.MENU))
                    break

                cTarget = $(cPPLi).children('a').get(0)
                if(cTarget)
                    continue
                break
            }
        }

        if(next)
            next.focus()

        return true;
    }

    static _handleLeftKey(event){
        let target      = event.target
        let parent      = target.parentNode
        let siblingUl   = target.nextElementSibling
        let parentOpen  = parent.classList.contains(ClassName.SHOW)

        if(siblingUl && parentOpen){
            target.click()

        }else{
            let gParent = parent.parentNode.parentNode
            if(gParent.classList.contains(ClassName.MENU_PARENT))
                $(gParent).children('a').focus()
        }

        return true
    }

    static _handleRightKey(event){
        let target      = event.target
        let parent      = target.parentNode
        let siblingUl   = target.nextElementSibling
        let parentOpen  = parent.classList.contains(ClassName.SHOW)

        if(siblingUl && !parentOpen)
            target.click()

        return true
    }

    static _handleUpKey(event){
        //   a
        //   a1                             ( 5 )
        //      b
        //      b1
        //      b2                          ( 4 )
        //          c
        //          c1
        //          c2                      ( 3 )
        //              d
        //              d1
        //              d2                  ( 2 )
        //   a2                             ( 1 )
        //   a3                 <!--        ( you're here )

        let target      = event.target          // a
        let parent      = target.parentNode     // li

        let prev

        let prevParent  = parent.previousElementSibling
        if(prevParent){
            let hasChildren = prevParent.classList.contains(ClassName.MENU_PARENT)
            let isOpen      = prevParent.classList.contains(ClassName.SHOW)

            if(hasChildren && isOpen){
                let nextParent = prevParent
                while(true){
                    let nextPUl     = $(nextParent).children('ul').get(0)
                    let lastNPUlLI  = nextPUl.lastElementChild
                    if(!lastNPUlLI)
                        break

                    let hasChildren = lastNPUlLI.classList.contains(ClassName.MENU_PARENT)
                    let isOpen      = lastNPUlLI.classList.contains(ClassName.SHOW)

                    if(!hasChildren || !isOpen){
                        prev = $(lastNPUlLI).children('a').get(0)
                        break
                    }

                    nextParent = lastNPUlLI
                }
            }else{
                prev = $(prevParent).children('a').get(0)
            }
        }else{
            let pParent = parent.parentNode     // ul
            let pPLi    = pParent.parentNode    // li
            if(pPLi.tagName === 'LI' && !pPLi.classList.contains(ClassName.MENU))
                prev = $(pPLi).children('a')
        }

        if(prev)
            prev.focus()

        return true;
    }

    static _dataApiKeydownHandler(event){
        let prevent = false
        switch(event.keyCode){
            case ARROW_DOWN_KEYCODE:
                prevent = VerticalMenu._handleDownKey(event)
                break;

            case ARROW_LEFT_KEYCODE:
                prevent = VerticalMenu._handleLeftKey(event)
                break;

            case ARROW_RIGHT_KEYCODE:
                prevent = VerticalMenu._handleRightKey(event)
                break;

            case ARROW_UP_KEYCODE:
                prevent = VerticalMenu._handleUpKey(event)
                break;
        }


        if(prevent){
            event.preventDefault()
            event.stopPropagation()
        }
    }

    static _jQueryInterface(config) {
        return this.each(function () {
            const $this   = $(this)
            let data      = $this.data(DATA_KEY)
            const _config = {
                ...Default,
                ...$this.data(),
                ...typeof config === 'object' && config ? config : {}
            }

            if(_config.toggle && _config.toggle === 'vertical-menu')
                _config.toggle = false;

            if (!data && _config.toggle && /show|hide/.test(config))
                _config.toggle = false

            if (!data) {
                data = new VerticalMenu(this, _config)
                $this.data(DATA_KEY, data)
            }

            if (typeof config === 'string') {
                if (typeof data[config] === 'undefined')
                    throw new TypeError(`No method named "${config}"`)
                data[config]()
            }
        })
    }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

$(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
  // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
  if (event.currentTarget.tagName === 'A') {
    event.preventDefault()
  }

  const $trigger = $(this)
  const $target  = $trigger.next('ul')
  VerticalMenu._jQueryInterface.call($target, 'toggle')
})

$(document).on(Event.KEYDOWN_DATA_API, Selector.MENU, VerticalMenu._dataApiKeydownHandler)

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */
$.fn[NAME] = VerticalMenu._jQueryInterface
$.fn[NAME].Constructor = VerticalMenu
$.fn[NAME].noConflict = () => {
  $.fn[NAME] = JQUERY_NO_CONFLICT
  return VerticalMenu._jQueryInterface
}

export default VerticalMenu