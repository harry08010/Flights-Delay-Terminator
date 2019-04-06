import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FlightDropdown from './FlightDropdown';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({

  item: {
    '&::after': {
      position: 'absolute',
      content: `''`,
      display: 'block',
      margin: '0 auto',
      width: '100%',
      borderBottom: '1px solid slateblue',
      paddingTop: '53px',
      left: '0',
    }
  },

  intro: {
    width: 180,
  },

  rate: {
    width: 20,
  },

  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

class FlightInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    }
  }

  getStops(flight) {
    if (flight.intervals.length === 0) {
      return 'Nonstop';
    }

    if (flight.intervals.length === 1) {
      return '1 Stop ';
    }

    return `${flight.intervals.length} Stops`;
  }

  handleExpandClick = () => {
    this.setState({expanded: !this.state.expanded})
  };

  render() {
    const { classes } = this.props;
    const flight = this.props.flight;
    return (
      <div>
        <ListItem className={classes.item} alignItems='flex-start'  button onClick={this.handleExpandClick.bind(this)}>
          <ListItemAvatar>
            <Avatar alt="carrier-img" src={require('../carrierImgs/' + flight.carrierCode + '.png')} />
          </ListItemAvatar>
          <ListItemText className={classes.intro}
            primary={`Duration: ${flight.totalTime}`}
            secondary={
              <React.Fragment>
                <Typography component="span" color="textPrimary">
                  {`${flight.carrierName}`}
                </Typography>
              </React.Fragment>
            }
            />
            <ListItem>
              <ListItemText inset primary={`$${flight.totalPrice}`} />
              <ListItemText className={classes.rate} inset primary={this.getStops(flight)} />
              <ListItemText inset primary={`Rate`} />
              {this.state.expanded ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
        </ListItem>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <FlightDropdown flight={flight}/>
        </Collapse>
    </div>
    );
  }
}

FlightInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FlightInfo);