import React from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import buttonArray from '../components/buttonArray.js'
import { getMathHandler } from '../components/arithmeticFunctions.js';
import { connect } from 'react-redux';
import examplesActions from '../actions/examples.js';
import '../App.css';

class Calculator extends React.Component {

    constructor() {
        super()
        this.state = {
            out: '0'
        }
        this.refOutput = React.createRef()
        this.refHistory = React.createRef()
        this.applyMath = getMathHandler();
    }

    enterNumber(value) {
        let currentValue = value
        let output = this.refOutput.current

        this.setState({
            out: currentValue
        })

        if (output.value === '0') {
            output.value = ''
        }
        output.value += currentValue
    }

    enterOperator(value) {
        let currentValue = value
        let output = this.refOutput.current
        let history = this.refHistory.current

        this.setState({
            out: currentValue
        })

        let outputCopy = output.value
        let last = outputCopy.slice(-1);

        if (buttonArray.operators.includes(last)) {
            outputCopy = outputCopy.slice(0, -1);
            output.value = outputCopy + currentValue
        } else {
            let result = this.applyMath(output.value)
            if (result !== output.value) {
                history.value = history.value + "" + output.value + " = " + result + "\n"
            }
            output.value = result
            output.value += currentValue
        }
    }

    enterEquals() {
        let output = this.refOutput.current
        let history = this.refHistory.current
        let result = this.applyMath(output.value)

        if (result !== output.value) {
            history.value = history.value + "" + output.value + " = " + result + "\n"
        }
        output.value = result
    }

    enterClean() {
        let output = this.refOutput.current
        let history = this.refHistory.current
        output.value = '0'
        history.value = ''

    }

    getExamplesAndSolve() {
        let history = this.refHistory.current

        let result = examplesActions.fetchExamples({
            count: 4,
        })(this.props.dispatch)

        result.then(function (value) {
            if (value.type === 'RECEIVE_EXAMPLES') {
                for (let example of value.examples) {
                    let solution = getMathHandler()(example);
                    if (solution !== example) {
                        history.value = history.value + "" + example + " = " + solution + "\n"
                    }
                }
            }
        })
    }

    render() {
        return (
            <div className="container">
                <Grid container className="root" spacing={0}>
                    <TextField
                        className="history"
                        fullWidth
                        multiline={true}
                        maxRows={10}
                        minRows={10}
                        inputProps={{ min: 0, style: { textAlign: 'right' } }}
                        inputRef={this.refHistory}
                        variant="standard" />
                    <Grid item xs={12}>
                        <TextField
                            className="output"
                            defaultValue={this.state.out}
                            fullWidth
                            variant="outlined"
                            inputRef={this.refOutput}
                        />
                    </Grid>
                    <Grid container item xs={9}>
                        {buttonArray.numbers.map((num, index) => (
                            <Grid item xs={4}>
                                <Button
                                    className="buttons"
                                    fullWidth
                                    key={index}
                                    variant="contained"
                                    onClick={() => { this.enterNumber(num) }}
                                >
                                    {num}
                                </Button>
                            </Grid>
                        ))}
                        <Grid item xs={4}>
                            <Button
                                className="buttons"
                                fullWidth
                                variant="contained"
                                onClick={() => { this.enterClean() }}
                            >
                                C
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                className="buttons"
                                color="secondary"
                                fullWidth
                                variant="contained"
                                onClick={() => { this.enterEquals() }}
                            >
                                =
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item container xs={3}>
                        {buttonArray.operators.map((item, index) => (
                            <Grid item xs={12}>
                                <Button
                                    className="buttons"
                                    color="primary"
                                    fullWidth
                                    key={index}
                                    variant="contained"
                                    onClick={() => { this.enterOperator(item) }}
                                >
                                    {item}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid item xs={8}>
                        <Button
                            className="buttons"
                            fullWidth
                            variant="contained"
                            onClick={() => { this.getExamplesAndSolve() }}
                        >
                            Get and solve examples
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapReduxStateToProps = reduxState => ({
    ...reduxState,
});

const mapDispatchToProps = dispatch => ({
    dispatch,
})

export default connect(mapReduxStateToProps, mapDispatchToProps)(Calculator);