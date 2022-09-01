import React, { Component } from 'react' 
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay:'false',
    operation:null,
    values: [0,0],
    current:0
    
}
export default class Calculator extends Component {
    state = {...initialState}

    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }
    clearMemory(){
        this.setState({ ...initialState })
        console.log('clear')
    }

    setOperation(operation) {
        if( this.state.current === 0){
            this.setState({operation, current:1, clearDisplay: true /* limpa display */})
        }
        else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)//res vai para values 0 e zera o values 1 \/
            values[1] = 0

            this.setState({
                displayValue: values[0]
            })
        }

        ///console.log(operation)
    }

    addDigit(n) {
        console.log(n)
        if( n === '.' && this.state.displayValue.includes('.')){
            return
        }
        
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '': this.state.displayValue
        const displayValue = currentValue + n
        this.setState({displayValue, clearDisplay: false})

        if(n !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values  = [... this.state.values]
            values[i] = newValue
            this.setState({values})
        }

        
    }

    render(){
        
        const addDigit  = n => this.addDigit(n)
        const setOperation = op => this.setOperation(op)
        return(
            <div className='calculator'>
                <Display value={this.state.displayValue}></Display>
                <Button label='AC' click={this.clearMemory} triple></Button>
                <Button label='/'  click={this.setOperation} operation></Button>
                <Button label='7'  click={this.addDigit}></Button>
                <Button label='8'  click={this.addDigit}></Button>
                <Button label='9'  click={this.addDigit}></Button>
                <Button label='*'  click={this.setOperation} operation></Button>
                <Button label='4'  click={this.addDigit}></Button>
                <Button label='5'  click={this.addDigit}></Button>
                <Button label='6'  click={this.addDigit}></Button>
                <Button label='-'  click={this.setOperation} operation></Button>
                <Button label='1'  click={this.addDigit}></Button>
                <Button label='2'  click={this.addDigit}></Button>
                <Button label='3'  click={this.addDigit}></Button>
                <Button label='+'  click={this.setOperation} operation></Button>
                <Button label='0'  click={this.addDigit} double></Button>
                <Button label='.'  click={this.addDigit}></Button>
                <Button label='='  click={this.setOperation} operation></Button>
            </div>
        )
    }
}