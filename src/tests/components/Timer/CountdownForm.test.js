import React from "react";
import ReactDOM from "react-dom";
import expect from 'expect';
const { findDOMNode } = ReactDOM;
///jquery
 import TestUtils from 'react-addons-test-utils';
import CountdownForm from '../../js/components/CountdownForm';


describe('CountdownForm', () => {
  it('should existe', () => {
expect(CountdownForm).toExist()
});

  it('devrait lancer handleCountdown quand un nombre valide est passe', () => {
    let spy = expect.createSpy();  //lui va essayer des trucs
    let countdownForm = TestUtils.renderIntoDocument(<CountdownForm onSetCountdown={spy} />); //passe le spy la
    let $el = $(findDOMNode(countdownForm)); //selectionne l element
    countdownForm.refs.secondes.value = '109'; //passe une valeur.

  TestUtils.Simulate.submit($el.find('form')[0]);

   expect(spy).toHaveBeenCalledWith(109);
});


it('devrait PAS lancer handleCountdown quand ce n est pas des chiffres', () => {
  let spy = expect.createSpy();  //lui va essayer des trucs
  let countdownForm = TestUtils.renderIntoDocument(<CountdownForm onSetCountdown={spy} />); //passe le spy la
  let $el = $(findDOMNode(countdownForm)); //selectionne l element
  countdownForm.refs.secondes.value = 'aqq'; //passe une valeur.

TestUtils.Simulate.submit($el.find('form')[0]);

 expect(spy).toNotHaveBeenCalled();
});

});
