import { Slideshow } from 'module.slideshow'
import { HTMLThemeElement } from 'element.theme'
import { debounce } from 'util.misc'

class FeaturedCollectionsCarousel extends HTMLThemeElement {
  connectedCallback() {
    super.connectedCallback()

    this.slider = this.querySelector('.featured-collections-carousel__slider')
    if (!this.slider || !this.slider.querySelector('.grid-item')) {
      return
    }

    this.visibleCount = parseInt(this.dataset.visible || '8', 10)

    const args = {
      prevNextButtons: this.dataset.arrows === 'true',
      pageDots: false,
      wrapAround: false,
      contain: true,
      // Move one card at a time
      groupCells: 1,
      percentPosition: false,
      cellAlign: 'left',
      cellSelector: '.grid-item',
      draggable: true
    }

    this.flickity = new Slideshow(this.slider, args)

    this.updateCellWidth()
    this._onResize = debounce(
      150,
      function () {
        this.updateCellWidth()
      }.bind(this)
    )
    window.addEventListener('resize', this._onResize)
  }

  updateCellWidth() {
    if (!this.slider || !this.visibleCount) return

    const containerWidth = this.slider.offsetWidth
    if (!containerWidth) return

    const gap = 16
    const totalGap = gap * (this.visibleCount - 1)
    const cellWidth = (containerWidth - totalGap) / this.visibleCount

    this.style.setProperty('--featured-collections-cell-width', `${cellWidth}px`)
    this.style.setProperty('--featured-collections-cell-gap', `${gap}px`)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    if (this._onResize) {
      window.removeEventListener('resize', this._onResize)
    }

    if (this.flickity && typeof this.flickity.destroy === 'function') {
      this.flickity.destroy()
    }
  }

  onSectionUnload() {
    if (this._onResize) {
      window.removeEventListener('resize', this._onResize)
    }

    if (this.flickity && typeof this.flickity.destroy === 'function') {
      this.flickity.destroy()
    }
  }
}

customElements.define('featured-collections-carousel', FeaturedCollectionsCarousel)
