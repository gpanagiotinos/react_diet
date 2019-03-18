import React from 'react'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
class NutritionRow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            dropdownActive: '',
            nutritionIndex: null,
            nutritionButtonText: 'Nutrients'
        }
        this.handleNutritionTabs = this.handleNutritionTabs.bind(this)
        this.handleNutritionHeading = this.handleNutritionHeading.bind(this)
        this.handleDropDownButton = this.handleDropDownButton.bind(this)
        this.handleDropDownActiveItem= this.handleDropDownActiveItem.bind(this)
        this.handleNutritionBody = this.handleNutritionBody.bind(this)
        this.handleMeasuresBody = this.handleMeasuresBody.bind(this)
    }
    handleNutritionTabs() {
        if (this.props.requestResolved) {
            return this.props.rowData.data.nutrients.map((nutrientsObject, index) => {
                return <a className='dropdown-item' onClick={() => this.handleDropDownActiveItem(index, nutrientsObject.name)} key={nutrientsObject.nutrient_id}>
                <span>{nutrientsObject.name}</span>
                </a>
            })
        }
    }
    handleNutritionHeading() {
        if (this.props.requestResolved) {
                
            return (<span className='title'>{this.props.rowData.data.desc.name}</span>)
        }
    }
    handleDropDownButton () {
        this.setState((prevState, props) => ({
            dropdownActive: prevState.dropdownActive === '' ? 'is-active' : ''   
        }))
    }
    handleDropDownActiveItem (index, name) {
        this.setState((prevState, props) => ({
            nutritionIndex: index,
            nutritionButtonText: name,
            dropdownActive: ''
        }))
    }
    handleNutritionBody () {
        if (this.props.requestResolved) {
            return this.props.rowData.data.nutrients.map((nutritionObj) => {
                return (
                    <div key={nutritionObj['nutrient_id']} className='control'>
                        <div className='tags are-medium has-addons'>
                            <span className='tag is-dark'>
                                {nutritionObj['name']}
                            </span>
                            <span className='tag is-info'>
                                {nutritionObj['value'] + nutritionObj['unit']}
                            </span>
                        </div>
                    </div>
                )
            })
        }
    }
    handleMeasuresBody () {
        if (this.props.requestResolved) {
            return this.props.rowData.data.nutrients[0].measures.map((measuresObj, index) => {
                return (
                    <div key={index} className='control'>
                        <div className='tags are-medium has-addons'>
                            <span className='tag is-dark'>
                                {measuresObj['qty'] + ' ' + measuresObj['label']}
                            </span>
                            <span className='tag is-success'>
                                {measuresObj['eqv'] + measuresObj['eunit']}
                            </span>
                        </div>
                    </div>
                )
            })
        }
    }
    render () {
        return (
            <td colSpan='4'>
                <nav className='panel'>
                    <p className='panel-heading'>
                        {this.handleNutritionHeading()}
                    </p>
                    <p className='panel-heading'>
                       MEASURES
                    </p>
                    <div className='panel-block'>
                        <div className='field is-grouped is-grouped-multiline'>
                                {this.handleMeasuresBody()}
                        </div>
                    </div>
                    <p className='panel-heading'>
                        NUTRIENTS (100g)
                    </p>
                    <div className='panel-block'>
                        <div className='field is-grouped is-grouped-multiline'>
                            {this.handleNutritionBody()}
                        </div>
                    </div>
                </nav>
            </td>
        )
    }
}
function mapStateToProps(state) {
    const {requestResolved, rowData} = state.tableRow
    return {requestResolved, rowData}
}

export default connect(mapStateToProps)(NutritionRow)