import formtCurrency
 from "../../scripts/utils/money.js";

describe('test suite : formatCurrency',()=>{
  it('converts cents into dollars',()=>{
    expect(formtCurrency(2095)).toEqual('20.95');
  });
  
  it('works with 0',()=>{
    expect(formtCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent',()=>{
    expect(formtCurrency(2000.5)).toEqual('20.01');
  });

  it('rounds down to the nearest cent',()=>{
    expect(formtCurrency(2000.4)).toEqual('20.00');
  })
})


