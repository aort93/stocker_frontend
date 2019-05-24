import React, { Component, Fragment } from 'react';
import {withRouter } from 'react-router-dom'

import PropTypes from "prop-types";
import { connect } from "react-redux"
import symbol from "./stocksymbols"

class Autocomplete extends Component {
 static propTypes = {
   suggestions: PropTypes.instanceOf(Array)
 };

 static defaultProps = {
   suggestions: []
 };

 constructor(props) {
   super(props);

   this.state = {
     // The active selection’s index
     activeSuggestion: 0,
     // The suggestions that match the user’s input
     filteredSuggestions: [],
     // Whether or not the suggestion list is shown
     showSuggestions: false,
     // What the user has entered
     userInput: ""
   };
 }

 // Event fired when the input value is changed
 onChange = e => {
   const { suggestions } = this.props;
   const userInput = e.currentTarget.value;

   // Filter our suggestions that don’t contain the user’s input
   const filteredSuggestions = suggestions.filter(
     suggestion =>
       suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
   );

   // Update the user input and filtered suggestions, reset the active
   // suggestion and make sure the suggestions are shown
   this.setState({
     activeSuggestion: 0,
     filteredSuggestions,
     showSuggestions: true,
     userInput: e.currentTarget.value
   });
 };


 onClick = e => {
   this.setState({
     activeSuggestion: 0,
     filteredSuggestions: [],
     showSuggestions: false,
     userInput: e.currentTarget.innerText
   });
   let match = symbol.find(symbol => {
     return symbol.symbol === e.currentTarget.innerText.split(' ')[0]
   })
   this.props.setSelectedStock(match.symbol)
   //new dispatch
   this.props.setCurrentSymbol(match.symbol)
   fetch(`http://localhost:3000/companies/${match.symbol}`)
   .then(r => r.json())
   .then (data => {
     // console.log(data)
     this.props.setCurrentCompany(data.company)
     this.props.setCurrentArticle(data.company_news)
     this.props.setLogo(data.logo)
   })
   // this.props.setArticle(match.symbol)
   this.props.history.push(`/companies/${e.currentTarget.innerText.split(' ')[0].toLowerCase()}`)
 };


 onKeyDown = e => {
   const { activeSuggestion, filteredSuggestions } = this.state;

  if (e.keyCode === 38) {
     if (activeSuggestion === 0) {
       return;
     }

     this.setState({ activeSuggestion: activeSuggestion - 1 });
   }

   else if (e.keyCode === 40) {
     if (activeSuggestion - 1 === filteredSuggestions.length) {
       return;
     }

     this.setState({ activeSuggestion: activeSuggestion + 1 });
   }
 };

 render() {
   // console.log(this.props.stockInfo)
   const {
     onChange,
     onClick,
     onKeyDown,
     state: {
       activeSuggestion,
       filteredSuggestions,
       showSuggestions,
       userInput
     }
   } = this;

   let suggestionsListComponent;

   if (showSuggestions && userInput) {
     if (filteredSuggestions.length) {
       suggestionsListComponent = (
         <ul className='suggestions'>
           {filteredSuggestions.map((suggestion, index) => {
             let className;

             if (index === activeSuggestion) {
               className = 'suggestion-active';
             }

             return (
               <li
                 className={className}
                 key={suggestion}
                 onClick={onClick}
               >
                 {suggestion}
               </li>
             );
           })}
         </ul>
       );
     } else {
       suggestionsListComponent = (
         <div className='no-suggestions'>
         </div>
       );
     }
   }
return (
     <Fragment>

         <input
         type='text'
         onChange={onChange}
         onKeyDown={onKeyDown}
         value={userInput}
         />
         {suggestionsListComponent}

     </Fragment>
   );
 }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentStock: state.currentStock,
    stockInfo: state.stockInfo
  }
}

function mapDispatchToProps(dispatch) {
 return {
   setSelectedStock: (stockTicker) => {
     dispatch({type: 'SELECT_STOCK', payload: stockTicker})
   },
   setCurrentSymbol: (symbol) => {
     dispatch({type: "SET_CURRENT_STOCK", payload: symbol})
   },
   setCurrentArticle: (article) => {
     dispatch({type: "SET_ARTICLE_INFO", payload: article})
   },
   setCurrentCompany: (company) => {
     dispatch({type: "SET_COMPANY_INFO", payload: company})
   },
   setLogo: (logo) => {
     dispatch({type: "SET_LOGO", payload: logo})
   }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Autocomplete));
