import Column from "./column";
import { dateToIndex, makeDateList } from "./utils";

import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class DateColumns extends PureComponent {

    static propTypes = {
        date: PropTypes.instanceOf( Date ).isRequired,
        dateOnly: PropTypes.bool.isRequired,
        locale: PropTypes.string,
        maximumDate: PropTypes.instanceOf( Date ).isRequired,
        minimumDate: PropTypes.instanceOf( Date ).isRequired,
        onChange: PropTypes.func.isRequired,
        styles: PropTypes.object.isRequired,
        todayDate: PropTypes.instanceOf( Date ).isRequired,
    };

    static getDerivedStateFromProps( props, state ) {
        const { date, minimumDate, maximumDate, locale, todayDate, todayTitle } = props;

        if ( state.date && state.date.valueOf() === date.valueOf() )
            return null;

        const list = makeDateList( { minimumDate, maximumDate, locale, todayDate, todayTitle } );

        const index = dateToIndex( date, list );
        return { date, index, list };
    }

    constructor( props, ...args ) {
        super( props, ...args );
        this.state = {};
    }

    render() {
        const { dateOnly, styles } = this.props;
        const { list, index } = this.state;
        return (
            <Column
                style={ [ styles.picker, styles.date ] }
                itemTextAlign={ dateOnly ? "center" : "right" }
                onItemSelected={ this.onDateSelected }
                list={ list }
                selectedItemPosition={ index }
            />
        );
    }

    onDateSelected = ( event ) => {
        const index = event.position;
        const value = this.state.list[ index ].value;

        this.setState( { index }, () => this.props.onChange( value ) );
    };

};
