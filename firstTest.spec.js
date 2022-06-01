/// <reference types="cypress"/>


describe('First Suite', () => {

    it('first test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by Tag Name
        cy.get('input')

        //by ID
        cy.get('#inputPassword2')

        //by Class
        cy.get(".input-full-width")

        //by Attribut Name
        cy.get('[type]')

        //by Attribute name and value
        cy.get('[type="password"]')

        //by Class value
        cy.get('[class="size-medium"]')

        //by Tag name and attribute with value
        cy.get('input[placeholder="Password"]')

        //by two different attribute
        cy.get('[placeholder="Email"][type="email"]')

        //by tag name, attribute with value, ID and class name
        cy.get('input[type="email"]#exampleInputEmail1.input-full-width')

        //the most recommended way by cypress
        cy.get('[data-cy="imputEmail1"]')

    })

    it('second test', () =>{

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]')
        
        cy.contains('Sign in')

        cy.contains('[status="warning"]','Sign in')

        cy.get('#inputEmail3')
        .parents('form')
        .find('button')
        .should('contain', 'Sign in')
        .parents('form')
        .find('nb-checkbox')
        .click()

        cy.contains('nb-card','Horizontal form').find('[type="email"]')
        cy.contains('nb-card','Horizontal form').find('nb-checkbox')

    })

    it('then and wrap methods', () =>{

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
       // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain','Password')
        //cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain','Email address')
       // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain','Password')

       //find in the below using JQuery method
       cy.contains('nb-card', 'Using the Grid').then( firstForm =>{
           const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
           const passLabelFirst = firstForm.find('[for="inputPassword2"]').text()
           expect(emailLabelFirst).to.equal('Email')
           expect(passLabelFirst).to.equal('Password')

           //find in the below using cypress style
           cy.contains('nb-card','Basic form').then( secondForm =>{
               const passSecondText = secondForm.find('[for="exampleInputPassword1"]').text()
               expect(passLabelFirst).to.equal(passSecondText)

               cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
           })


       })
    })

    it('invoke Command', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //Example 1 to get email address label
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //Example 2 to get email address label
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal('Email address')
        })

        //Get label in website using invoke command
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
            expect(text).to.equal('Email address')
        })

        cy.contains('nb-card','Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            //.should('contain', 'checked')

            //or can use the following assertion
            .then(classValue => {
                expect(classValue).to.contain('checked')
           })


    })

    it('assert property', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('17').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Apr 17, 2022')

        })
            
        })

    it('Radio Button', () =>{

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons =>{
            cy.wrap(radioButtons)
              .first()
              .check({force: true})
              .should('be.checked')

            cy.wrap(radioButtons)
              .eq(1)
              .check({force: true})
              
            cy.wrap(radioButtons)
              .first()
              .should('not.be.checked')

            cy.wrap(radioButtons)
              .eq(2)
              .should('be.disabled')


        })

    })

    it('Check Boxes', () =>{

        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

//check() method use to checked radio buttons and check boxes can not uncheck the, use click() method to unchecked
        //cy.get('[type="checkbox"]').check({force:true})
        cy.get('[type="checkbox"]').eq(0).click({force:true})
        cy.get('[type="checkbox"]').eq(1).check({force:true})
        cy.get('[type="checkbox"]').eq(2).click({force:true})


    })

    it('Lists and dropdown', () =>{

        cy.visit('/')

        //1. Verify when select drop down
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()

        //assertion to verify value = Dark
        cy.get('nav nb-select').should('contain', 'Dark')

        //assetsion to verify color changing by RGB
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        //2 verify for each dropdown value
        cy.get('nav nb-select').then( dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each( (listItem, index) =>{
                const itemText = listItem.text().trim()

                const colors ={
                    "Light": "rgb(255, 255, 255)",
                    "Dark":"rgb(34, 43, 69)",
                    "Cosmic":"rgb(50, 50, 89)",
                    "Corporate":"rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if( index <3){
                    cy.wrap(dropdown).click()
                }
            })
        })

    })

    it('Web Tables', () =>{

        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

//Update table value and verify by row index
        cy.get('tbody').contains('tr', 'Ruben').then( tableRow =>{
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('40')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', '40')
        })
//Add new table and verify by row index
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then( tableRow =>{
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Ayu')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Test')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        
        cy.get('tbody tr').first().find('td').then( tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Ayu')
            cy.wrap(tableColumns).eq(3).should('contain', 'Test')
        })

//3 search value in a table (iterate thu the coloms)
        const age = [20, 30, 40, 200]

        cy.wrap(age).each( age =>{
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each( tableRow =>{
                if(age == 200){
                    cy.wrap(tableRow).should('contain', 'No data found')

                }else{
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            

        })
        })
        

    })

    it('Date picker', () =>{

        function selectDayFromCurrent(day){
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            console.log(futureDay)
            let futureMonth = date.toLocaleString('default', {month: 'short'})
            let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                if(!dateAttribute.includes(futureMonth)){
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(day)
                }else{
                    cy.get('nb-calendar-day-picker [class="ng-star-inserted"]').contains(futureDay).click()
                }
            })
            return dateAssert
        } 

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(300)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)

        })

    })
   
    it('Tooltip', () =>{
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

    //get Tooltip    
        cy.contains('nb-card','Colored Tooltips')
        .contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')

    })

    it('Dialog box', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Dialog').click()

        cy.contains('nb-card', 'Open Dialog')
        .contains('Open Dialog with component').click()

        cy.contains('nb-card', 'This is a title passed to the dialog component')
        .contains('button', 'Dismiss Dialog').click()

        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1 not recomended one, will not run well if there is no message  on the window confirm
        //cy.get('tbody tr').first().find('.nb-trash').click()
        //cy.on('window:confirm', (confirm) => {
        //   expect(confirm).to.equal('Are you sure you want to delete?')
        //})

        //2. recomended way
       // const stub = cy.stub()
       // cy.on('window:confirm', stub)
       // cy.get('tbody tr').first().find('.nb-trash').click().then(() =>{
      //      expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
      //  })

        //3. select no in the window confirm pop up
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', () => false)


    })

    it.only('Assertion', () => {

//https://docs.cypress.io/guides/references/assertions#Chai-jQuery documentation for assertion
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

//Assertion using should contain or have
        cy.get('[for="exampleInputEmail1"]')
            .should('contain', 'Email address')
            .should('have.class', 'label')
            .and('have.text', 'Email address')

//Assertion using to expect to have
        cy.get('[for="exampleInputEmail1"]').then( label => {
            expect(label.text()).to.equal('Email address')
            expect(label).to.have.class('label')
            expect(label).to.have.text('Email address')
        })

        function selectDayFromCurrent(day){
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            console.log(futureDay)
            let futureMonth = date.toLocaleString('default', {month: 'short'})
            let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                if(!dateAttribute.includes(futureMonth)){
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(day)
                }else{
                    cy.get('nb-calendar-day-picker [class="ng-star-inserted"]').contains(futureDay).click()
                }
            })
            return dateAssert
        } 

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(300)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
    //Assertion to have exact value
            cy.wrap(input).should('have.value', dateAssert)

        })

    })
})