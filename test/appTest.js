const chai=require('chai');
const chathttp=require('chai-http');
const app=require('../app').app;

chai.use(chathttp);


describe('App',function(){
    var host = "http://localhost:5000";
    var path = "/scrape";
    
    
    describe('POST /scrape',()=>{

        //Test for POST request with url:'https://stackoverflow.com'
        it('OK, fetching metadata from URL works',()=>{
            
            chai.request(host)
                .post(path)
                .set('Content-Type', 'application/json')
                .send({ url:'https://stackoverflow.com' })
                .then(function (res) {
                    chai.expect(res).to.have.status(200);
                    const body=res.body;
                    chai.expect(body).to.contain.property('title');
                })
                .catch(function (err) {
                    console.log(err);
                });

        });

        //Test for POST request with url:''
        it('OK, testing error handler',()=>{
            
            chai.request(host)
                .post(path)
                .set('Content-Type', 'application/json')
                .send({ url:'' })
                .then(function (res) {
                    chai.expect(res).to.have.status(200);
                    const body=res.body;
                    chai.expect(body).to.contain.property('error');
                })
                .catch(function (err) {
                    console.log(err);
                });

        });
        
    });
});