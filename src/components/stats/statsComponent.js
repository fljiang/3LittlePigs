import React from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import coin from './../../img/icons/coin_icon.png';
import brick from './../../img/icons/brick_icon.png';
import stick from './../../img/icons/stick_icon.png';
import stone from './../../img/icons/stone_icon.png';
import mud from './../../img/icons/mud_icon.png';
import wolf from './../../img/icons/wolf_icon.png';
import pot from './../../img/icons/pot_icon.png';
import spoon from './../../img/icons/spoon_icon.png';
import apple from './../../img/icons/apple_icon.png';
import flower from './../../img/icons/flower_icon.png';
import glass from './../../img/icons/glass_icon.png';
import vp from './../../img/icons/vp_icon.png';
import water from './../../img/icons/water_icon.png';
import './statsComponent.css';

const Stats = ({ 
  numCoins, 
  numBricks, 
  numSticks, 
  numMud, 
  numStones, 
  numWolves, 
  numPots, 
  numSpoons,
  numApples,
  numFlowers,
  numGlasses,
  numVps,
  numWater
}) => (
  <Box border={1} width="40%">
    <List style={{ marginRight: -10 }}>
      <ListItem style={{ height: 20, marginLeft: -10 }}>
        <img src={coin} alt="" style={{ width: 25, height: 25 }} />
        <ListItemText 
          disableTypography
          primary={<Typography className="Key">Coins</Typography>}
        />
        <ListItemText 
          disableTypography
          primary={<Typography className="Value">{numCoins}</Typography>}
        />
      </ListItem>

      <ListItem style={{ height: 25, marginLeft: -10 }}>
        <img src={vp} alt="" style={{ width: 25, height: 25 }} />
        <ListItemText 
          disableTypography
          primary={<Typography className="Key">Victory Points</Typography>}
        />
        <ListItemText 
          disableTypography
          primary={<Typography className="Value">{numVps}</Typography>}
        />
      </ListItem>

      <ListItem style={{ height: 25, marginLeft: -5 }}>
        <ListItemText 
          disableTypography
          primary={<Typography className="Key">Resources</Typography>}
        />
      </ListItem>
      <ListItem style={{ height: 25, marginLeft: 0 }}>
        <ListItem style={{ marginTop: -20, marginBottom: -20, marginLeft: -15 }}>
          <img src={brick} alt="" style={{ width: 25, height: 32.5 }} />
          <ListItemText 
            disableTypography
            primary={<Typography className="SubKey">Bricks</Typography>}
          />
          <ListItemText 
            disableTypography
            primary={<Typography className="Value">{numBricks}</Typography>}
          />
        </ListItem>

        <ListItem style={{ margin: -5 }}>
          <img src={mud} alt="" style={{ width: 25, height: 32.5 }} />
          <ListItemText 
            disableTypography
            primary={<Typography className="SubKey">Mud</Typography>}
          />
          <ListItemText 
            disableTypography
            primary={<Typography className="Value">{numMud}</Typography>}
          />
        </ListItem>
      </ListItem>
      <ListItem style={{ height: 25, marginLeft: 0 }}>
        <ListItem style={{ marginTop: -20, marginBottom: -20, marginLeft: -15 }}>
          <img src={stick} alt="" style={{ width: 25, height: 32.5 }} />
          <ListItemText 
            disableTypography
            primary={<Typography className="SubKey">Sticks</Typography>}
          />
          <ListItemText 
            disableTypography
            primary={<Typography className="Value">{numSticks}</Typography>}
          />
        </ListItem>

        <ListItem style={{ margin: -5 }}>
          <img src={stone} alt="" style={{ width: 25, height: 32.5 }} />
          <ListItemText 
            disableTypography
            primary={<Typography className="SubKey">Stones</Typography>}
          />
          <ListItemText 
            disableTypography
            primary={<Typography className="Value">{numStones}</Typography>}
          />
        </ListItem>
      </ListItem>
      <ListItem style={{ height: 25, marginLeft: 0 }}>
        <ListItem style={{ marginTop: -20, marginBottom: -20, marginLeft: -15 }}>
          <img src={water} alt="" style={{ width: 25, height: 32.5 }} />
          <ListItemText 
            disableTypography
            primary={<Typography className="SubKey">Water</Typography>}
          />
          <ListItemText 
            disableTypography
            primary={<Typography className="Value">{numWater}</Typography>}
          />
        </ListItem>

        <ListItem style={{ margin: -5 }}>
          <img src={flower} alt="" style={{ width: 25, height: 32.5 }} />
          <ListItemText 
            disableTypography
            primary={<Typography className="SubKey">Flowers</Typography>}
          />
          <ListItemText 
            disableTypography
            primary={<Typography className="Value">{numFlowers}</Typography>}
          />
        </ListItem>
      </ListItem>
      <ListItem style={{ height: 25, marginLeft: 0 }}>
        <ListItem style={{ marginTop: -20, marginBottom: -20, marginLeft: -15 }}>
          <img src={apple} alt="" style={{ width: 25, height: 32.5 }} />
          <ListItemText 
            disableTypography
            primary={<Typography className="SubKey">Apples</Typography>}
          />
          <ListItemText 
            disableTypography
            primary={<Typography className="Value">{numApples}</Typography>}
          />
        </ListItem>
        <ListItem style={{ margin: -5 }}>
          <ListItemText style={{ width: 25 }} />
          <ListItemText primary={<Typography className="SubKey" />} />
          <ListItemText primary={<Typography className="Value" />} />
        </ListItem>
      </ListItem>

      <ListItem style={{ height: 25, marginLeft: -5 }}>
        <ListItemText 
          disableTypography
          primary={<Typography className="Key">Appliances</Typography>}
        />
      </ListItem>
      <ListItem style={{ height: 25, marginLeft: 0 }}>
        <ListItem style={{ marginTop: -20, marginBottom: -20, marginLeft: -15 }}>
          <img src={pot} alt="" style={{ width: 25, height: 32.5, marginBottom: 5 }} />
          <ListItemText 
            disableTypography
            primary={<Typography className="SubKey">Pot</Typography>}
          />
          <ListItemText 
            disableTypography
            primary={<Typography className="Value">{numPots}</Typography>}
          />
        </ListItem>

        <ListItem style={{ margin: -5 }}>
          <img src={spoon} alt="" style={{ width: 25, height: 32.5 }} />
          <ListItemText 
            disableTypography
            primary={<Typography className="SubKey">Spoon</Typography>}
          />
          <ListItemText 
            disableTypography
            primary={<Typography className="Value">{numSpoons}</Typography>}
          />
        </ListItem>
      </ListItem>

      <ListItem style={{ height: 25, marginLeft: 0 }}>
        <ListItem style={{ marginTop: -20, marginBottom: -15, marginLeft: -15 }}>
          <img src={glass} alt="" style={{ width: 25, height: 32.5 }} />
          <ListItemText 
            disableTypography
            primary={<Typography className="SubKey">Glasses</Typography>}
          />
          <ListItemText 
            disableTypography
            primary={<Typography className="Value">{numGlasses}</Typography>}
          />
        </ListItem>
        <ListItem style={{ margin: -5 }}>
          <ListItemText style={{ width: 25 }} />
          <ListItemText primary={<Typography className="SubKey" />} />
          <ListItemText primary={<Typography className="Value" />} />
        </ListItem>
      </ListItem>

      <ListItem style={{ height: 25, marginLeft: -10 }}>
        <img src={wolf} alt="" style={{ width: 25, height: 32.5 }} />
        <ListItemText 
          disableTypography
          primary={<Typography className="Key">Wolves</Typography>}
        />
        <ListItemText 
          disableTypography
          primary={<Typography className="Value">{numWolves}</Typography>}
        />
      </ListItem>
    </List>
  </Box>
);

export default Stats;
