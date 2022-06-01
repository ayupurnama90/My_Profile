import { onDatePickerPage } from "../support/page_objects/datepickerPage"
import { onFormLayoutPage } from "../support/page_objects/formLayoutsPage"
import { navigateTo, onNavigationPage } from "../support/page_objects/navigationPage"
import { onSmartTablePage } from "../support/page_objects/smartTablePage"

describe('Test with Page Object', () =>{

    beforeEach('open application', () =>{
        cy.openHomePage()
    })

    it('verify navigation across the pages', () => {
        navigateTo.formLayoutPage()
        navigateTo.datepickerPage()
        navigateTo.toasterPage()
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
    })

    it.only('should submit Inline and Basic form and select tomorrow date in the calendar', () => {
        navigateTo.formLayoutPage()
        onFormLayoutPage.submitInlineFormWithNameAndEmail('Ayu','ayu@test.com')
        onFormLayoutPage.submitBasicFormWithEmailAndPassword('ayu@test.com','test123')
        navigateTo.datepickerPage()
        onDatePickerPage.selectCommonDatepickerDateFromToday(1)
        onDatePickerPage.selectDatepickerWithRange(7, 14)
        navigateTo.smartTablePage()
        onSmartTablePage.AddNewDataWithName('Ayu','Purnama')
        onSmartTablePage.updateAgeByFirstName('Ayu','30')
        onSmartTablePage.deleteDataByIndex(1)

    })

})