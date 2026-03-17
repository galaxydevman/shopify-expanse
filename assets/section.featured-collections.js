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

    if (this.flickity && this.flickity.slideshow) {
      const prevButton = this.slideshow.querySelector('.flickity-prev-next-button.previous')
      const nextButton = this.slideshow.querySelector('.flickity-prev-next-button.next')
      const totalSlides = this.flickity.slideshow.cells ? this.flickity.slideshow.cells.length : 0

      const updateArrows = () => {
        const index = this.flickity.slideshow.selectedIndex || 0

        if (prevButton) {
          prevButton.disabled = index === 0
        }

        if (nextButton) {
          nextButton.disabled = totalSlides > 0 ? index >= totalSlides - 1 : false
        }
      }

      updateArrows()
      this.flickity.slideshow.on('change', updateArrows)
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    if (this.flickity && typeof this.flickity.destroy === 'function') {
      this.flickity.destroy()
    }
  }
}

customElements.define('featured-collections-component', FeaturedCollections)

