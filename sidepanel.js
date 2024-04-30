
async function dx() {
    const src = chrome.runtime.getURL("./scripts/sidepanel_bundle.js");
    await import(src)
}
dx()
document.getElementById('btn_mint').addEventListener('click',async ()=>{
    document.getElementById('info_btn').innerText='Minted By Gas'
    document.getElementById('mints_btn_items').style.display='flex'
    document.getElementById('tab1').style.display='block'
    document.getElementById('Mint_png').style.visibility='visible'
    
    document.getElementById('Trade_png').style.visibility='hidden'
    document.getElementById('tab2').style.display='none'
    document.getElementById('btn_mint_font').style.fontSize='18px'
    document.getElementById('btn_mint_font').style.fontWeight='bold'
    document.getElementById('btn_mint_font').style.color='#000000'
    document.getElementById('btn_trade_font').style.fontSize='15px'
    document.getElementById('btn_trade_font').style.fontWeight='bold'
    document.getElementById('btn_trade_font').style.color='#7A7D7C'

})

document.getElementById('btn_trade').addEventListener('click',async ()=>{
    document.getElementById('info_btn').innerText='Automatic Liquid Swap Only "Liquid Mint" Supported'
    document.getElementById('mints_btn_items').style.display='none'
    document.getElementById('tab2').style.display='block'
    document.getElementById('Mint_png').style.visibility='hidden'
    
    document.getElementById('Trade_png').style.visibility='visible'
    document.getElementById('tab1').style.display='none'
    
    document.getElementById('btn_trade_font').style.fontSize='18px'
    document.getElementById('btn_trade_font').style.fontWeight='bold'
    document.getElementById('btn_trade_font').style.color='#000000'
    document.getElementById('btn_mint_font').style.fontSize='15px'
    document.getElementById('btn_mint_font').style.fontWeight='bold'
    document.getElementById('btn_mint_font').style.color='#7A7D7C'
})


document.getElementById('Liquid_Mint_btn').addEventListener('click',async ()=>{
    document.getElementById('info_btn').innerText='100% of your ETH is added to the Pool.'
    document.getElementById('Liquid_Mint_btn').className='mint-flex-col mint-justify-start mint-items-center button'
    document.getElementById('Liquid_Mint_span').className='font text_5'
    
    document.getElementById('Gas_Mint_btn').className='mint-flex-col mint-justify-start mint-items-center button_2'
    document.getElementById('Gas_Mint_span').className='font_4 text_6'

    document.getElementById('PFPs_btn').className='mint-flex-col mint-justify-start mint-items-center button_2'
    document.getElementById('PFPs_span').className='font_4 text_6'

    document.getElementById('Mint95').className='mint-flex-col mint-justify-start mint-items-center button_2'
    document.getElementById('Mint95_span').className='font_4 text_6'

    document.getElementById('gas_mint_tab').style.display='none'
    document.getElementById('mint_95_tab').style.display='none'
    document.getElementById('pfps_tab').style.display='none'
    document.getElementById('liquid_mint_tab').style.display='block'
})

document.getElementById('Gas_Mint_btn').addEventListener('click',async ()=>{
    document.getElementById('info_btn').innerText='Minted By Gas'

    document.getElementById('Gas_Mint_btn').className='mint-flex-col mint-justify-start mint-items-center button'
    document.getElementById('Gas_Mint_span').className='font text_5'
    
    document.getElementById('Mint95').className='mint-flex-col mint-justify-start mint-items-center button_2'
    document.getElementById('Mint95_span').className='font_4 text_6'

    document.getElementById('PFPs_btn').className='mint-flex-col mint-justify-start mint-items-center button_2'
    document.getElementById('PFPs_span').className='font_4 text_6'

    document.getElementById('Liquid_Mint_btn').className='mint-flex-col mint-justify-start mint-items-center button_2'
    document.getElementById('Liquid_Mint_span').className='font_4 text_6'

    document.getElementById('liquid_mint_tab').style.display='none'
    document.getElementById('mint_95_tab').style.display='none'
    document.getElementById('pfps_tab').style.display='none'
    document.getElementById('gas_mint_tab').style.display='block'
})

document.getElementById('Mint95').addEventListener('click',async ()=>{
    document.getElementById('info_btn').innerText='95% Mint'

    document.getElementById('Mint95').className='mint-flex-col mint-justify-start mint-items-center button'
    document.getElementById('Mint95_span').className='font text_5'

    document.getElementById('PFPs_btn').className='mint-flex-col mint-justify-start mint-items-center button_2'
    document.getElementById('PFPs_span').className='font_4 text_6'
    
    document.getElementById('Gas_Mint_btn').className='mint-flex-col mint-justify-start mint-items-center button_2'
    document.getElementById('Gas_Mint_span').className='font_4 text_6'

    document.getElementById('Liquid_Mint_btn').className='mint-flex-col mint-justify-start mint-items-center button_2'
    document.getElementById('Liquid_Mint_span').className='font_4 text_6'

    document.getElementById('gas_mint_tab').style.display='none'
    document.getElementById('mint_95_tab').style.display='block'
    document.getElementById('pfps_tab').style.display='none'
    document.getElementById('liquid_mint_tab').style.display='none'
})


document.getElementById('PFPs_btn').addEventListener('click',async ()=>{
    document.getElementById('info_btn').innerText='PFPs'

    document.getElementById('PFPs_btn').className='mint-flex-col mint-justify-start mint-items-center button'
    document.getElementById('PFPs_span').className='font text_5'
    
    document.getElementById('Mint95').className='mint-flex-col mint-justify-start mint-items-center button_2'
    document.getElementById('Mint95_span').className='font_4 text_6'

    document.getElementById('Gas_Mint_btn').className='mint-flex-col mint-justify-start mint-items-center button_2'
    document.getElementById('Gas_Mint_span').className='font_4 text_6'

    document.getElementById('Liquid_Mint_btn').className='mint-flex-col mint-justify-start mint-items-center button_2'
    document.getElementById('Liquid_Mint_span').className='font_4 text_6'

    document.getElementById('gas_mint_tab').style.display='none'
    document.getElementById('mint_95_tab').style.display='none'
    document.getElementById('pfps_tab').style.display='block'
    document.getElementById('liquid_mint_tab').style.display='none'
})