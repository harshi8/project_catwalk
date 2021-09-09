import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import Carousel from '../shared/Carousel.jsx'
import Stars from '../shared/Stars.jsx';
import getAverageRating from '../shared/getAverageRating.js';
import Dropdown from '../shared/Dropdown.jsx';
import Button from '../shared/Button.jsx';
import { FaRegHeart, FaCheck, FaPlus, FaFacebook, FaTwitter, FaPinterest } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { SocialButtonRow, Column1, Column2, FeatureChecklist, StyleContainer, StyleSelector, StyleHeader, ButtonRow2, ButtonRow1, Price, Name, Category, StarsWrapper, Description, Slogan, Banner, OverviewWrapper } from './subcomponents/Styled.jsx';

const Overview = ({ current }) => {
  //set state: have isolated photos/thumbnails and sku/sale for easier useEffect logic
  const [styles, updateStyles] = useState([]);
  const [currentStyle, updateCurrentStyle] = useState({});
  const [features, updateFeatures] = useState([]);
  const [thumbnails, updateThumbnails] = useState([]);
  const [meta, updateMeta] = useState({});
  const [numReviews, updateNumReviews] = useState(0);

  //state which depends on the currentStyle/is updated in the second useEffect hook
  const [avgRating, updateAvg] = useState(0);
  const [photos, updatePhotos] = useState([]);
  const [skus, updateSkus] = useState([]);

  //state which depends on user interaction with dropdowns + is useful for cart
  const [size, updateSize] = useState('');
  const [qty, updateQty] = useState(0);

  //ref to access size dropdown
  const sizeRef = useRef(null);

  //fetches styles and sets default to first style based on current product on mount. This useEffect acts like componentDidMount
  useEffect(async () => {
    try {
        if(current.id) {
          let res = await fetch(`/products/${current.id}/styles`);
          let arr = await res.json();

          updateStyles(arr.results);
          updateCurrentStyle(arr.results[0]);
          updateFeatures(current.features);

          let newMeta = await fetch(`/reviews/meta?product_id=${current.id}`).then(data => data.json());
          let avg = getAverageRating(newMeta.ratings);
          updateAvg(avg);
          updateMeta(newMeta);

          let reviews = await fetch(`/reviews?product_id=${current.id}&count=1000`).then(data => data.json());
          updateNumReviews(reviews.results.length);
        }
    } catch (err) {
      console.error('err fetching styles or metadata', err);
    }
  },[current]);

  // updates photos for carousel on change to current style to avoid type errors
  useEffect(() => {
    if(currentStyle.photos) {
      let newPhotos = currentStyle.photos.map(photo => photo.url);
      let newThumbnails = currentStyle.photos.map(photo => photo.thumbnail_url);
      updatePhotos(newPhotos);
      updateThumbnails(newThumbnails);
      updateSkus(Object.values(currentStyle.skus));
    }
  }, [currentStyle.photos]);

//click handlers for *all* the buttons
  const styleClickHandler = (e) => {
    const thumb = e.target.src;
    let newStyle = styles.filter(style => style.photos[0].thumbnail_url === thumb)[0];
    updateCurrentStyle(newStyle);
  };

  const sizeDropdownCallback = (option) => {
    updateSize(option);
  };

  const qtyDropdownCallback = (option) => {
    updateQty(option);
  }

  const cartClickHandler = (e) => {
    //edge cases: size not selected or sku not in stock
    if (!size) {
      sizeRef.current.click();
      alert('Please select size.')
      return;
    }
    let currentSku = skus.filter(sku => (sku.size === size))
    let inStock = currentSku[0].quantity;
    if(!inStock) {
      document.getElementById('cartButton').remove();
      return;
    }
    //most requests should fall through to here
    let body = {
      sku_id: Object.keys(currentStyle.skus).find(key => currentStyle.skus[key] === currentSku[0]),
      count: qty
    }
    fetch('/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then((res) => {
      if(res.status === (200 || 201)) {
        alert('successfully added to cart!');
      } else {
        console.error('err posting to cart', res);
      }
    }).catch((err) => {
      console.error('err posting to cart', err);
    });
  }
  const reviewScroller = (e) => {
    e.preventDefault();
    let elt = document.getElementById('reviews');
    elt.scrollIntoView();
  };


  return (
    <>
      <OverviewWrapper>
        <Banner>SITE-WIDE ANNOUCEMENT MESSAGE!</Banner>
        <Column1>
          <Carousel urls={photos} thumbnails={thumbnails} />
          <Slogan>{current.slogan}</Slogan>
          <Description>{current.description}</Description>
          <SocialButtonRow>
            <a href="http://facebook.com"><FaFacebook size="2em" /></a>
            <a href="http://twitter.com"><FaTwitter size="2em"/></a>
            <a href="http://pinterest.com"><FaPinterest size="2em"/></a>
          </SocialButtonRow>
        </Column1>
        <Column2>
        <StarsWrapper>
          <Stars currentRating={avgRating}/>
          {(numReviews > 0) && <a href="#" onClick={reviewScroller} style={{color: 'grey'}}>Read all {numReviews} reviews</a> }
        </StarsWrapper>
          <Category>{current.category}</Category>
          <Name>{current.name}</Name>
          <Price style={currentStyle.sale_price ? {color: 'red'} : {}} >{'$' + (currentStyle.sale_price || currentStyle.original_price)}</Price>
          <StyleHeader> <h4>STYLE ></h4>{ ' ' + currentStyle.name || 'SELECTED STYLE'}</StyleHeader>
          <StyleSelector>
            {styles.length && currentStyle.photos && styles.map(style => style.photos[0].thumbnail_url).map((nail, i) => (
            <StyleContainer key={i}>
              {(nail === currentStyle.photos[0].thumbnail_url) && (<IconContext.Provider value={{ style: { position: 'absolute' } }}>
                <FaCheck />
              </IconContext.Provider>)}
              <img src={nail} onClick={styleClickHandler} alt="thumbnail image of clothing style"/>
            </StyleContainer>
            ))}
          </StyleSelector>
          <ButtonRow1>
            <Dropdown
              options={ skus.length && skus.filter(sku => (sku.quantity > 0)).map(sku => sku.size)}
              title={ skus.length && skus.filter(sku => (sku.quantity > 0)).length ? 'SELECT SIZE' : 'OUT OF STOCK' }
              width="60%"
              callback={sizeDropdownCallback}
              nref={sizeRef}
            />
            <Dropdown
            options={skus.length && skus.filter(sku => (sku.size === size)).map(sku => sku.quantity).reduce((acc, quant) => {
              for(var x = 1; x < (quant > 15 ? 15 : quant); x++) {
                acc.push(x);
              }
              return acc;
            }, [])}
            title={qty || "QUANTITY"}
            callback={qtyDropdownCallback}/>
          </ButtonRow1>
          <ButtonRow2>
            <Button
              height="4rem"
              width="70%"
              onClick={cartClickHandler}
              id="cartButton"
              >ADD TO CART<FaPlus />
            </Button>
            <Button height="4rem" width="3rem"><FaRegHeart/></Button>
          </ButtonRow2>
          <FeatureChecklist>
              {features.map((feature, i) => {
                return (<div key={i}>
                  <FaCheck /> {`${feature.feature}`}
                </div>);
                  })}
          </FeatureChecklist>
        </Column2>
      </OverviewWrapper>
    </>
  );
}

export default Overview;
