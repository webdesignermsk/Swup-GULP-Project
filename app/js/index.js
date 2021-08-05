// Importing Helpers
import { NodeHelper, FuncsHelper } from './modules/Helpers';

// Getting Methods from Helpers
const { getNode, getNodes, addClass, removeClass, nextNode } = new NodeHelper();
const { imgLoadHelper } = new FuncsHelper();

alert('hello');
console.log('object');

const circleType = new CircleType(getNode('#rotated')).radius(80);
window.scroll(function () {
  let offset = $(window).scrollTop();
  offset = offset * 0.4;
  getNode('.circle-text').css({
    transform: 'rotate(' + offset + 'deg)',
  });
});

// Invoking Functions from Helper
