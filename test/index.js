const R = require('ramda');
const should = require('chai').should();
const subject = require('../src/index');

const explicit = `{
  "@context": { 
    "@base": "http://schema.howarddierking.com/",
    "@vocab": "http://schema.org/"
  },
  "@type": "Person",
  "@id": "/howard-dierking",
  "name": "Howard Dierking",
  "givenName": "Howard",
  "familyName": "Dierking",
  "url": "https://www.howarddierking.com"
}`;

const inferred = `{
  "@context": { 
    "@base": "http://schema.howarddierking.com/",
    "@vocab": "http://schema.howarddierking.com/",
    "s": "http://schema.org/",
    "hd": "http://schema.howarddierking.com/",
    "owl": "http://www.w3.org/2002/07/owl#"
  },
  "@graph": [
    {
      "@id": "hd:firstName",
      "owl:sameAs": {"@id": "s:givenName"}
    },
    {
      "@id": "hd:lastName",
      "owl:sameAs": {"@id": "s:familyName"}
    },
    {
     "@type": "Person",
     "@id": "/howard-dierking",
     "name": "Howard Dierking",
     "firstName": "Howard",
     "familyName": "Dierking",
     "url": "https://www.howarddierking.com"
   } 
  ]
}`;


describe('index', () => {
	describe('#getFirstName', () => {
		it('should return expected value for explicit triples', (done) => {
			R.pipeP(subject.graphFor, subject.getFirstName)(explicit)
			.then(actual => {
				actual.should.eql('Howard');
				done();
			});
		});
		it('should return expected value for inferred triples', (done) => {
			R.pipeP(subject.graphFor, subject.getFirstName)(inferred)
			.then(actual => {
				actual.should.eql('Howard');
				done();
			});
		});
	})
})