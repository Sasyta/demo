describe('login steam', () => {

    it('will verify we are able to login', () => {
       cy.visit('') 
       cy.get('a.global_action_link').click()
       cy.url().should('include', '/login')
       cy.login(Cypress.env('username'),Cypress.env('password'))
       cy.get('#account_pulldown').should('contain', 'sasy_rf')
    });
    it('will verify we are able to search a game', () => {
        cy.get('#store_nav_search_term').type('Crab Game')
        cy.get('#store_search_link > img').click()
        cy.get('#search_result_container').should('contain', 'Crab Game')
    }); 
    it('will verify we are able to send game to wishlist', () => {
        cy.get('.col.search_capsule').first().click()
        cy.get('#queueActionsCtn > p > a').click()
        cy.login(Cypress.env('username'),Cypress.env('password'))
        cy.get('#add_to_wishlist_area').click()
        cy.get('.wishlist_added_temp_notice').should('contain', 'Item added to your wishlist!')
    })
    it('will verify our wished game is listed in the wishlist page', () => {
        cy.contains('.store_header_btn_content', 'Wishlist').click()
        cy.login(Cypress.env('username'),Cypress.env('password'))
        cy.wait(4000)
        cy.get('#wishlist_ctn .wishlist_row')
          .scrapeElements({
              elementsToScrape: [
                  { label: 'product_name', locator: 'a.title'},
                  //{ label: 'overall_reviews', locator: '.value game_review_summary positive'},
              ],
            })
          .then((scrapeData) => {
           /*var testData = JSON.stringify(scrapeData.data);
            cy.log(testData)*/
                expect(scrapeData.data).to.deep.eq([
                { 
                    product_name: 'Among Us',
                    //overall_reviews: 'VERY POSITIVE',
                },
                { 
                    product_name: 'Crab Game',
                    //overall_reviews: 'VERY POSITIVE',
                },
            ]);
          });
        })
    it('will verify we are able to add item to cart',() => {
        cy.get('.noicon > span').click()
        cy.wait(5000)
        cy.url().should('include', '/cart')
    })
    /*it('will verify we are able sent items to purchase', () => {
        cy.get('a.global_action_link').click()
        cy.login(Cypress.env('username'),Cypress.env('password'))
        cy.get('#btn_purchase_self').click()
        cy.url().should('include', '/checkout')
    })*/
});