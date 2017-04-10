import React, { Component } from 'react';
import { Card, CardTitle, CardActions } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';

import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

const styles = {
    floating: {
        margin: 0,
        top: '10',
        right: 20,
        left: 'auto',
        position: 'fixed',
    },
    flat: {
        overflow: 'inherit',
        margin: "auto",
        top: 100,
        right: 20,
        position: 'fixed',
    },
    sortButton: {
        minWidth: 40,
    },
    nonSortableLabel: {
        position: 'relative',
        paddingLeft: 16,
        paddingRight: 16,
        verticalAlign: 'middle',
        letterSpacing: 0,
        textTransform: 'uppercase',
        fontWeight: 500,
        fontSize: 14,
    },
};

export default class List extends Component {
    render() {
        return (
            <div>
                <Card style={{ opacity:  1 }}>
                    <CardTitle title="表格标题" />
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>ID</TableHeaderColumn>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>Status</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableRowColumn>1</TableRowColumn>
                                <TableRowColumn>John Smith</TableRowColumn>
                                <TableRowColumn>Employed</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>2</TableRowColumn>
                                <TableRowColumn>Randal White</TableRowColumn>
                                <TableRowColumn>Unemployed</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>3</TableRowColumn>
                                <TableRowColumn>Stephanie Sanders</TableRowColumn>
                                <TableRowColumn>Employed</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>4</TableRowColumn>
                                <TableRowColumn>Steve Brown</TableRowColumn>
                                <TableRowColumn>Employed</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>1</TableRowColumn>
                                <TableRowColumn>John Smith</TableRowColumn>
                                <TableRowColumn>Employed</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>2</TableRowColumn>
                                <TableRowColumn>Randal White</TableRowColumn>
                                <TableRowColumn>Unemployed</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>3</TableRowColumn>
                                <TableRowColumn>Stephanie Sanders</TableRowColumn>
                                <TableRowColumn>Employed</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>4</TableRowColumn>
                                <TableRowColumn>Steve Brown</TableRowColumn>
                                <TableRowColumn>Employed</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            </div>
        );
    }
}