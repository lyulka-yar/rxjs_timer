import {buffer, filter, fromEvent, interval, takeWhile} from "rxjs";
import {debounceTime, map, takeUntil} from "rxjs/operators";
import {useEffect, useRef, useState} from "react";
import {Buttons, Display} from "./component";
import {Card, Container} from "@mui/material";

const App = () => {
    const start = useRef(null);
    const stop = useRef(null);
    const wait = useRef(null);
    const reset = useRef(null);

    const [timeState, setTimeState] = useState({h: 0, m: 0, s: 0});
    const seconds$ = interval(1000);

    useEffect(() => {
        let tmpTime = {h: 0, m: 0, s: 0};
        const start$ = fromEvent(start.current, "click");
        const stop$ = fromEvent(stop.current, "click");
        const reset$ = fromEvent(reset.current, "click");
        const waitTmp$ = fromEvent(wait.current, "click");
        const buff$ = waitTmp$.pipe(debounceTime(300)); // is this solution is right?? for task requirements

        const wait$ = waitTmp$.pipe(
            buffer(buff$),
            map((queue) => queue.length),
            filter((clicks) => clicks === 2)
        );
        let status = true;
        // can`t resolve problem with button RESET doesn`t reset state value and restarts timer

        start$.subscribe(() => {
            seconds$
                .pipe(
                    takeUntil(start$),
                    takeUntil(reset$),
                    takeUntil(stop$),
                    takeUntil(wait$),
                    takeWhile(()=> status)
                )
                .subscribe(() => {
                    setTimeState({...tmpTime});

                    switch (true) {
                        case tmpTime.h === 0 && tmpTime.m === 0 && tmpTime.s === 5:
                            status = false;
                            tmpTime = {h: 0, m: 0, s: 0};
                            setTimeState({h: 0, m: 0, s: 0});
                            break;
                        case tmpTime.m === 59:
                            tmpTime.h++;
                            tmpTime.m = 0;
                            break;
                        case tmpTime.s === 59:
                            tmpTime.m++;
                            tmpTime.s = 0;
                            break;

                        default:
                            tmpTime.s++;
                    }
                });
        });

        stop$.subscribe(() => {
            tmpTime = {h: 0, m: 0, s: 0};
            setTimeState({h: 0, m: 0, s: 0});
        });

        reset$.subscribe(() => {
            setTimeState({h: 0, m: 0, s: 0});
        });

    }, []);

    return (
        <Container
            sx={{
                height: "90vh",
                width: "100vw",
                m: "0 auto",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                justifyContent: "center",
                fontSize: "68px",
            }}
        >
            <Card
                sx={{
                    p: "1.5rem 1rem",
                    m: "3rem 5rem",
                    boxShadow: "0 0 5px #1d1d1d, 0 0 5px #1d1d1d",
                    bgcolor: "#e7dcdc",
                }}
            >
                <Display timeState={timeState}/>

                <Buttons start={start} stop={stop} wait={wait} reset={reset}/>
            </Card>
        </Container>
    );
};

export default App;
