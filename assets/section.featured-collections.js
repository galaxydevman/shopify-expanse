import { Slideshow } from 'module.slideshow'
import { HTMLThemeElement } from 'element.theme'

class FeaturedCollections extends HTMLThemeElement {
  connectedCallback() {
    super.connectedCallback()

    this.slideshow = this.querySelector(`#FeaturedCollections-${this.sectionId}`)

    if (!this.slideshow) {
      return
    }

    const defaults = {
      adaptiveHeight: false,
      avoidReflow: true,
      pageDots: false,
      prevNextButtons: true,
      wrapAround: false,
      cellAlign: 'left',
      contain: true,
      groupCells: 1
    }

    this.flickity = new Slideshow(this.slideshow, defaults)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    if (this.flickity && typeof this.flickity.destroy === 'function') {
      this.flickity.destroy()
    }
  }
}

customElements.define('featured-collections-component', FeaturedCollections)

