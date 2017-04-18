import React from "react";
import ReactDOM from "react-dom";
import expect from 'expect';
const { findDOMNode  } = ReactDOM;
///jquery
 import TestUtils from 'react-addons-test-utils';
//import ReactTestUtils from 'react-dom/test-utils';
import Clock from '../../js/components/Clock'


describe('Clock', () => {
  it('should existe', () => {
    expect(Clock).toExist()
  })

describe('render', () => {
  it('devrait render clock to output', () => {
      let clock = TestUtils.renderIntoDocument(<Clock totalSecondes={62}/>);
      let $el = $(findDOMNode(clock));
      var actualText = $el.find('.clock-text').text();

      expect(actualText).toBe('01:02')
  });
})

describe('formatSecondes', () => {
  it('should format secondes', () => {
    let clock = TestUtils.renderIntoDocument(<Clock />);
    let secondes = 615;
    let expected = '10:15';
    let actual = clock.formatSecondes(secondes)

    expect(actual).toBe(expected);
  })

  it('should format secondes a 61', () => {
    let clock = TestUtils.renderIntoDocument(<Clock />);
    let secondes = 61;
    let expected = '01:01';
    let actual = clock.formatSecondes(secondes)

    expect(actual).toBe(expected);
  })

})

})
