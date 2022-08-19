import React, { useState, ChangeEvent, useRef } from 'react';
import NGram from 'ngram-model';

import Input from './Input';
import Trainer from './trainer';
import { EXTERNALS } from './config';

import NLP from './assets/nlp.png';
import GITHUB from './assets/github.svg';
import NPM from './assets/npm.svg';

import './App.scss';

export default function App() {
    const [trainer, setTrainer] = useState<string>(Trainer);
    const [current, setCurrent] = useState<string>('');
    const [suggestion, setSuggestion] = useState<string>('');
    const [n, setN] = useState<number>();
    const [trainDisabled, setTrainDisable] = useState(true);
    const [currentDisabled, setCurrentDisable] = useState(true);
    const nGramRef = useRef<NGram>();
    const resultRef = useRef<HTMLDivElement>(null);

    function applyCurrent(value: string) {
        const resultDom = resultRef.current;

        if (!nGramRef.current) {
            return;
        }

        setCurrent(value);

        if (resultDom) {
            resultDom.scrollTo({ top: resultDom.scrollHeight });
        }

        if (value.replace(/ /g, '') !== current.replace(/ /g, '')) {
            setSuggestion(nGramRef.current.guess(value, 1)[0]);
        }
    }

    function handleTrainerChange(e: ChangeEvent<HTMLTextAreaElement>) {
        if (!nGramRef.current) {
            return;
        }

        const value = e.currentTarget.value;

        setTrainer(value);
        setTrainDisable(false);
    }

    function handleNChange(e: ChangeEvent<HTMLSelectElement>) {
        const newN = parseInt(e.currentTarget.value);

        if (!newN) {
            return;
        }

        nGramRef.current = new NGram(newN);

        setN(newN);
        setCurrentDisable(true);
        setTrainDisable(false);
    }

    function handleCurrentChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;

        applyCurrent(value);
    }

    function handleTrainClick() {
        if (!nGramRef.current) {
            return;
        }

        nGramRef.current.train(trainer);

        setTrainDisable(true);
        setCurrentDisable(false);
    }

    function handleSuggestionSelect(value: string) {
        applyCurrent(`${current} ${value}`);
    }

    return (
        <main className='container'>
            <div className='container__content'>
                <div className='container__content-box'>
                    <label className='container__content-box-label'>
                        Select n:
                    </label>
                    <select
                        className='container__content-box-select'
                        onChange={handleNChange}
                        value={n || ''}>
                        <option value='' disabled={true}>
                            Select
                        </option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                        <option value='9'>9</option>
                        <option value='10'>10</option>
                    </select>
                </div>

                <div className='container__content-box'>
                    <label className='container__content-box-label'>
                        Put trainer text here:
                    </label>
                    <textarea
                        className='container__content-box-textarea'
                        value={trainer}
                        onChange={handleTrainerChange}
                    />
                </div>

                <div className='container__content-box'>
                    <button
                        className='container__content-box-button'
                        type='button'
                        onClick={handleTrainClick}
                        disabled={trainDisabled}>
                        Train
                    </button>
                </div>

                <div className='container__content-box'>
                    <label className='container__content-box-label'>
                        Start typing:
                    </label>
                    <Input
                        className='container__content-box-input'
                        value={current}
                        onChange={handleCurrentChange}
                        disabled={currentDisabled}
                        suggestion={suggestion}
                        onSuggestionSelect={handleSuggestionSelect}
                    />
                    <div
                        ref={resultRef}
                        className='container__content-box-result'>
                        {current}
                    </div>
                </div>
            </div>

            <label className='container__credits'>
                By{' '}
                <a
                    className='container__credits-link'
                    href={EXTERNALS.LINKEDIN}
                    target='_blank'
                    rel='noreferrer'>
                    ErAz7
                </a>
            </label>

            <a
                className={`
                    container__footer-link
                    container__footer-link--npm
                `}
                href={EXTERNALS.NPM}
                target='_blank'
                rel='noreferrer'>
                <NPM className='container__footer-link-logo' /> NPM Package
            </a>

            <a
                className={`
                    container__footer-link
                    container__footer-link--github
                `}
                href={EXTERNALS.GITHUB}
                target='_blank'
                rel='noreferrer'>
                <GITHUB className='container__footer-link-logo' /> Github Repo
            </a>

            <div className='container__title'>
                <img src={NLP} className='container__title-logo' />
                N-Gram
            </div>
        </main>
    );
}
