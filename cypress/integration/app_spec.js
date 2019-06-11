describe("Base Application", () => {
  // it("Config Cy Server", () => {
  //   cy.server()
  //   cy.route('GET', )
  // })
  beforeEach(function () {
    cy.fixture("chef.json").as("chef")
  })

  it("Chef Page Load", function () {
    cy.visit("/chef")
    cy.get("#search-input").should("have.value", "")
    cy.get("#food-group").contains("Food Group")
    cy.get("#add-new-diet")
    .children('span')
    .should('have.class', 'icon')
    .click()
    cy.get('#new-diet-0')
    .children('div').should('have.class', 'content')
    .children('div').should('have.class', 'field is-grouped is-grouped-multiline')
  })
  it ("Chef Search Input", function () {
    cy.get("#search-input")
    .type(this.chef.foodSearch.food)
    .should("have.value", this.chef.foodSearch.food)
    cy.get("#search-input-dropdown-menu")
    .children('div').should('have.class', 'dropdown-content')
    .children('a').should('have.class', 'dropdown-item')
    cy.get("#search-input-dropdown-content")
    .should('have.class', 'dropdown-content')
    .children().should('have.length', 25)
    cy.get("#search-input-dropdown-content")
    .scrollTo('bottom')
    .children().should('have.length', 50)
  })
  it ("Add Item To Menu", function () {
    cy.get("#search-input-dropdown-content")
    .children('a').each(($el, index, $list) => {
      cy.wrap($el).should('have.class', 'dropdown-item')
      if (index === 5 || index === 10 || index === 30 || index === 35) {
        cy.wrap($el).click()
      }
    })
    cy.get('#new-diet-0').children('div').children('div')
    .should('have.class', 'field is-grouped is-grouped-multiline')
    .children('div').should('have.class', 'control')
    .children('div').should('have.class', 'tags has-addons')
  })

})