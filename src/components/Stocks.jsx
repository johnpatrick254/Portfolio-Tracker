/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

const Stocks = forwardRef((props, ref) => {

    const [apple, setApple] = useState('');
    const [amd, setAmd] = useState('');
    const [tsla, setTesla] = useState('');
    const [msft, setMsf] = useState('');
    const [date, setDate] = useState('');
    const [amountStart, setAmountStart] = useState('');
    const [amount, setAmount] = useState('');
    const [err, setErr] = useState(false);
    const [errText, setErrText] = useState('');
    const [portfolio, setPortFolio] = useState(null);

    useImperativeHandle(ref, () => {

        return {
            refresh,
            handleSubmit
        }

    });

    const handleChange = (e) => {
        setDate(e.target.value);
        console.log(e.target.value)
    };

    const validateMaxInput = (input) => {
        setErr(false)
        const sum = Number(apple) + Number(amd) + Number(tsla) + Number(msft);
        setAmount(sum);

        if (input > 100) {
            setErrText(`Maximum percentage exceeded !`);
            setErr(true);
        } else {
            setErr(false);
        }
    };

    const handleSubmit = () => {
        const sum = Number(apple) + Number(amd) + Number(tsla) + Number(msft);
        setAmount(sum);
        if (amount < 100 | amount > 100) {
            setErrText(`Careful: Ensure all percentages add-up to 100% !`);
            console.log("amt:", amount)
            setErr(true);
        } else {
            setErr(false);
            console.log("current total:", sum)
            console.log(portfolio)
            return portfolio
        }

    }
    const refresh = () => {
        const sum = Number(apple) + Number(amd) + Number(tsla) + Number(msft);
        setAmount(sum);
        setDate(date);
    }
    useEffect(() => {
        const sum = Number(apple) + Number(amd) + Number(tsla) + Number(msft);
        const userInput = [
            {
                title: "AAPL",
                percent:apple,
                value: (apple * amountStart) / 100,
                date: date,
                totals: amountStart,

                shares: +(((apple * amountStart) / 100) / 186.68).toFixed(2)
            },
            {
                title: "MFST",
                percent:msft,
                value: (msft * amountStart) / 100,
                date: date,
                totals: amountStart,
                shares: +(((msft * amountStart) / 100) / 335.02
                ).toFixed(2)
            },
            {
                title: "TSLA",
                percent:tsla,
                value: +(tsla * amountStart) / 100,
                date: date,
                totals: amountStart,
                shares: +(((tsla * amountStart) / 100) / 256.60
                ).toFixed(2)
            },
            {
                title: "AMD",
                percent:amd,
                value: (amd * amountStart) / 100,
                date: date,
                totals: amountStart,
                shares: +(((amd * amountStart) / 100) / 110.01

                ).toFixed(2)
            },

        ];
        setPortFolio(userInput)


    }, [amd, tsla, apple, msft, date]);



    return (
        <>
            <div className="stocks">


                <div className="init">
                    <div className="date">
                        <p>Start Date</p>
                        <input
                            type="date"
                            autoComplete="off"
                            id="startDate"
                            name="startDate"
                            value={date}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="innit-amount">
                        <label htmlFor="amount">Starting Balance $</label>
                        <input
                            type="text"
                            name="amount"
                            onChange={(e) => {
                                setAmountStart(+e.target.value);
                            }}
                            value={amountStart}
                        />
                    </div>
                </div>
                <div className="err">
                    <h2>{err && errText}</h2>
                </div>
                <div className="stock">
                    <h1>AAPL</h1>

                    <div className="stock-input">
                        <input
                            type="text"
                            name="AAPL"
                            onChange={(e) => {
                                setApple(+e.target.value);
                                validateMaxInput(e.target.value);
                            }}
                            value={apple}
                        />
                        <span> % </span>
                    </div>
                </div>
                <div className="stock">
                    <h1>MSFT</h1>
                    <div className="stock-input">
                        <input
                            type="text"
                            name="MSFT"
                            onChange={(e) => {
                                setMsf(+e.target.value);
                                validateMaxInput(e.target.value);
                            }}
                            value={msft}
                        />
                        <span> %</span>
                    </div>
                </div>
                <div className="stock">
                    <h1>TSLA</h1>
                    <div className="stock-input">
                        <input
                            type="text"
                            name="TSLA"
                            onChange={(e) => {
                                setTesla(+e.target.value);
                                validateMaxInput(e.target.value);
                            }}
                            value={tsla}
                        />
                        <span> %</span>
                    </div>
                </div>
                <div className="stock">
                    <h1> AMD</h1>
                    <div className="stock-input">
                        <input
                            type="text"
                            name="TSLA"
                            onChange={(e) => {
                                setAmd(+e.target.value);
                                validateMaxInput(e.target.value);
                            }}
                            value={amd}
                        />
                        <span> %</span>
                    </div>
                </div>


                <div className={`${props.loading && 'loading'} submit`}>
                    <button onMouseEnter={refresh} onClick={props.ref_Function}>Submit</button>
                </div>

            </div>
        </>
    );
}

);
export default Stocks;