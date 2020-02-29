import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DogPawIcon from './images/dog-paw-icon.png';
import CatPawIcon from './images/cat-paw-icon.png'
import Collapse from '@material-ui/core/Collapse';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Switch from '@material-ui/core/Switch';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const citiesInUK = ["Aberaeron", "Aberdare", "Aberdeen", "Aberfeldy", "Abergavenny", "Abergele", "Abertillery", "Aberystwyth", "Abingdon", "Accrington", "Adlington", "Airdrie", "Alcester", "Aldeburgh", "Aldershot", "Aldridge", "Alford", "Alfreton", "Alloa", "Alnwick", "Alsager", "Alston", "Amesbury", "Amlwch", "Ammanford", "Ampthill", "Andover", "Annan", "Antrim", "Appleby in Westmorland", "Arbroath", "Armagh", "Arundel", "Ashbourne", "Ashburton", "Ashby de la Zouch", "Ashford", "Ashington", "Ashton in Makerfield", "Atherstone", "Auchtermuchty", "Axminster", "Aylesbury", "Aylsham", "Ayr", "Bacup", "Bakewell", "Bala", "Ballater", "Ballycastle", "Ballyclare", "Ballymena", "Ballymoney", "Ballynahinch", "Banbridge", "Banbury", "Banchory", "Banff", "Bangor", "Barmouth", "Barnard Castle", "Barnet", "Barnoldswick", "Barnsley", "Barnstaple", "Barrhead", "Barrow in Furness", "Barry", "Barton upon Humber", "Basildon", "Basingstoke", "Bath", "Bathgate", "Batley", "Battle", "Bawtry", "Beaconsfield", "Bearsden", "Beaumaris", "Bebington", "Beccles", "Bedale", "Bedford", "Bedlington", "Bedworth", "Beeston", "Bellshill", "Belper", "Berkhamsted", "Berwick upon Tweed", "Betws y Coed", "Beverley", "Bewdley", "Bexhill on Sea", "Bicester", "Biddulph", "Bideford", "Biggar", "Biggleswade", "Billericay", "Bilston", "Bingham", "Birkenhead", "Birmingham", "Bishop Auckland", "Blackburn", "Blackheath", "Blackpool", "Blaenau Ffestiniog", "Blandford Forum", "Bletchley", "Bloxwich", "Blyth", "Bodmin", "Bognor Regis", "Bollington", "Bolsover", "Bolton", "Bootle", "Borehamwood", "Boston", "Bourne", "Bournemouth", "Brackley", "Bracknell", "Bradford", "Bradford on Avon", "Brading", "Bradley Stoke", "Bradninch", "Braintree", "Brechin", "Brecon", "Brentwood", "Bridge of Allan", "Bridgend", "Bridgnorth", "Bridgwater", "Bridlington", "Bridport", "Brigg", "Brighouse", "Brightlingsea", "Brighton", "Bristol", "Brixham", "Broadstairs", "Bromsgrove", "Bromyard", "Brynmawr", "Buckfastleigh", "Buckie", "Buckingham", "Buckley", "Bude", "Budleigh Salterton", "Builth Wells", "Bungay", "Buntingford", "Burford", "Burgess Hill", "Burnham on Crouch", "Burnham on Sea", "Burnley", "Burntisland", "Burntwood", "Burry Port", "Burton Latimer", "Bury", "Bushmills", "Buxton", "Caernarfon", "Caerphilly", "Caistor", "Caldicot", "Callander", "Calne", "Camberley", "Camborne", "Cambridge", "Camelford", "Campbeltown", "Cannock", "Canterbury", "Cardiff", "Cardigan", "Carlisle", "Carluke", "Carmarthen", "Carnforth", "Carnoustie", "Carrickfergus", "Carterton", "Castle Douglas", "Castlederg", "Castleford", "Castlewellan", "Chard", "Charlbury", "Chatham", "Chatteris", "Chelmsford", "Cheltenham", "Chepstow", "Chesham", "Cheshunt", "Chester", "Chester le Street", "Chesterfield", "Chichester", "Chippenham", "Chipping Campden", "Chipping Norton", "Chipping Sodbury", "Chorley", "Christchurch", "Church Stretton", "Cinderford", "Cirencester", "Clacton on Sea", "Cleckheaton", "Cleethorpes", "Clevedon", "Clitheroe", "Clogher", "Clydebank", "Coalisland", "Coalville", "Coatbridge", "Cockermouth", "Coggeshall", "Colchester", "Coldstream", "Coleraine", "Coleshill", "Colne", "Colwyn Bay", "Comber", "Congleton", "Conwy", "Cookstown", "Corbridge", "Corby", "Coventry", "Cowbridge", "Cowdenbeath", "Cowes", "Craigavon", "Cramlington", "Crawley", "Crayford", "Crediton", "Crewe", "Crewkerne", "Criccieth", "Crickhowell", "Crieff", "Cromarty", "Cromer", "Crowborough", "Crowthorne", "Crumlin", "Cuckfield", "Cullen", "Cullompton", "Cumbernauld", "Cupar", "Cwmbran", "Dalbeattie", "Dalkeith", "Darlington", "Dartford", "Dartmouth", "Darwen", "Daventry", "Dawlish", "Deal", "Denbigh", "Denton", "Derby", "Dereham", "Devizes", "Dewsbury", "Didcot", "Dingwall", "Dinnington", "Diss", "Dolgellau", "Donaghadee", "Doncaster", "Dorchester", "Dorking", "Dornoch", "Dover", "Downham Market", "Downpatrick", "Driffield", "Dronfield", "Droylsden", "Dudley", "Dufftown", "Dukinfield", "Dumbarton", "Dumfries", "Dunbar", "Dunblane", "Dundee", "Dunfermline", "Dungannon", "Dunoon", "Duns", "Dunstable", "Durham", "Dursley", "Easingwold", "East Grinstead", "East Kilbride", "Eastbourne", "Eastleigh", "Eastwood", "Ebbw Vale", "Edenbridge", "Edinburgh", "Egham", "Elgin", "Ellesmere", "Ellesmere Port", "Ely", "Enniskillen", "Epping", "Epsom", "Erith", "Esher", "Evesham", "Exeter", "Exmouth", "Eye", "Eyemouth", "Failsworth", "Fairford", "Fakenham", "Falkirk", "Falkland", "Falmouth", "Fareham", "Faringdon", "Farnborough", "Farnham", "Farnworth", "Faversham", "Felixstowe", "Ferndown", "Filey", "Fintona", "Fishguard", "Fivemiletown", "Fleet", "Fleetwood", "Flint", "Flitwick", "Folkestone", "Fordingbridge", "Forfar", "Forres", "Fort William", "Fowey", "Framlingham", "Fraserburgh", "Frodsham", "Frome", "Gainsborough", "Galashiels", "Gateshead", "Gillingham", "Glasgow", "Glastonbury", "Glossop", "Gloucester", "Godalming", "Godmanchester", "Goole", "Gorseinon", "Gosport", "Gourock", "Grange over Sands", "Grangemouth", "Grantham", "Grantown on Spey", "Gravesend", "Grays", "Great Yarmouth", "Greenock", "Grimsby", "Guildford", "Haddington", "Hadleigh", "Hailsham", "Halesowen", "Halesworth", "Halifax", "Halstead", "Haltwhistle", "Hamilton", "Harlow", "Harpenden", "Harrogate", "Hartlepool", "Harwich", "Haslemere", "Hastings", "Hatfield", "Havant", "Haverfordwest", "Haverhill", "Hawarden", "Hawick", "Hay on Wye", "Hayle", "Haywards Heath", "Heanor", "Heathfield", "Hebden Bridge", "Helensburgh", "Helston", "Hemel Hempstead", "Henley on Thames", "Hereford", "Herne Bay", "Hertford", "Hessle", "Heswall", "Hexham", "High Wycombe", "Higham Ferrers", "Highworth", "Hinckley", "Hitchin", "Hoddesdon", "Holmfirth", "Holsworthy", "Holyhead", "Holywell", "Honiton", "Horley", "Horncastle", "Hornsea", "Horsham", "Horwich", "Houghton le Spring", "Hove", "Howden", "Hoylake", "Hucknall", "Huddersfield", "Hungerford", "Hunstanton", "Huntingdon", "Huntly", "Hyde", "Hythe", "Ilford", "Ilfracombe", "Ilkeston", "Ilkley", "Ilminster", "Innerleithen", "Inveraray", "Inverkeithing", "Inverness", "Inverurie", "Ipswich", "Irthlingborough", "Irvine", "Ivybridge", "Jarrow", "Jedburgh", "Johnstone", "Keighley", "Keith", "Kelso", "Kempston", "Kendal", "Kenilworth", "Kesgrave", "Keswick", "Kettering", "Keynsham", "Kidderminster", "Kilbarchan", "Kilkeel", "Killyleagh", "Kilmarnock", "Kilwinning", "Kinghorn", "Kingsbridge", "Kington", "Kingussie", "Kinross", "Kintore", "Kirkby", "Kirkby Lonsdale", "Kirkcaldy", "Kirkcudbright", "Kirkham", "Kirkwall", "Kirriemuir", "Knaresborough", "Knighton", "Knutsford", "Ladybank", "Lampeter", "Lanark", "Lancaster", "Langholm", "Largs", "Larne", "Laugharne", "Launceston", "Laurencekirk", "Leamington Spa", "Leatherhead", "Ledbury", "Leeds", "Leek", "Leicester", "Leighton Buzzard", "Leiston", "Leominster", "Lerwick", "Letchworth", "Leven", "Lewes", "Leyland", "Lichfield", "Limavady", "Lincoln", "Linlithgow", "Lisburn", "Liskeard", "Lisnaskea", "Littlehampton", "Liverpool", "Llandeilo", "Llandovery", "Llandrindod Wells", "Llandudno", "Llanelli", "Llanfyllin", "Llangollen", "Llanidloes", "Llanrwst", "Llantrisant", "Llantwit Major", "Llanwrtyd Wells", "Loanhead", "Lochgilphead", "Lockerbie", "London", "Londonderry", "Long Eaton", "Longridge", "Looe", "Lossiemouth", "Lostwithiel", "Loughborough", "Loughton", "Louth", "Lowestoft", "Ludlow", "Lurgan", "Luton", "Lutterworth", "Lydd", "Lydney", "Lyme Regis", "Lymington", "Lynton", "Mablethorpe", "Macclesfield", "Machynlleth", "Maesteg", "Magherafelt", "Maidenhead", "Maidstone", "Maldon", "Malmesbury", "Malton", "Malvern", "Manchester", "Manningtree", "Mansfield", "March", "Margate", "Market Deeping", "Market Drayton", "Market Harborough", "Market Rasen", "Market Weighton", "Markethill", "Markinch", "Marlborough", "Marlow", "Maryport", "Matlock", "Maybole", "Melksham", "Melrose", "Melton Mowbray", "Merthyr Tydfil", "Mexborough", "Middleham", "Middlesbrough", "Middlewich", "Midhurst", "Midsomer Norton", "Milford Haven", "Milngavie", "Milton Keynes", "Minehead", "Moffat", "Mold", "Monifieth", "Monmouth", "Montgomery", "Montrose", "Morecambe", "Moreton in Marsh", "Moretonhampstead", "Morley", "Morpeth", "Motherwell", "Musselburgh", "Nailsea", "Nailsworth", "Nairn", "Nantwich", "Narberth", "Neath", "Needham Market", "Neston", "New Mills", "New Milton", "Newbury", "Newcastle", "Newcastle Emlyn", "Newcastle upon Tyne", "Newent", "Newhaven", "Newmarket", "Newport", "Newport Pagnell", "Newport on Tay", "Newquay", "Newry", "Newton Abbot", "Newton Aycliffe", "Newton Stewart", "Newton le Willows", "Newtown", "Newtownabbey", "Newtownards", "Normanton", "North Berwick", "North Walsham", "Northallerton", "Northampton", "Northwich", "Norwich", "Nottingham", "Nuneaton", "Oakham", "Oban", "Okehampton", "Oldbury", "Oldham", "Oldmeldrum", "Olney", "Omagh", "Ormskirk", "Orpington", "Ossett", "Oswestry", "Otley", "Oundle", "Oxford", "Padstow", "Paignton", "Painswick", "Paisley", "Peebles", "Pembroke", "Penarth", "Penicuik", "Penistone", "Penmaenmawr", "Penrith", "Penryn", "Penzance", "Pershore", "Perth", "Peterborough", "Peterhead", "Peterlee", "Petersfield", "Petworth", "Pickering", "Pitlochry", "Pittenweem", "Plymouth", "Pocklington", "Polegate", "Pontefract", "Pontypridd", "Poole", "Port Talbot", "Portadown", "Portaferry", "Porth", "Porthcawl", "Porthmadog", "Portishead", "Portrush", "Portsmouth", "Portstewart", "Potters Bar", "Potton", "Poulton le Fylde", "Prescot", "Prestatyn", "Presteigne", "Preston", "Prestwick", "Princes Risborough", "Prudhoe", "Pudsey", "Pwllheli", "Ramsgate", "Randalstown", "Rayleigh", "Reading", "Redcar", "Redditch", "Redhill", "Redruth", "Reigate", "Retford", "Rhayader", "Rhuddlan", "Rhyl", "Richmond", "Rickmansworth", "Ringwood", "Ripley", "Ripon", "Rochdale", "Rochester", "Rochford", "Romford", "Romsey", "Ross on Wye", "Rostrevor", "Rothbury", "Rotherham", "Rothesay", "Rowley Regis", "Royston", "Rugby", "Rugeley", "Runcorn", "Rushden", "Rutherglen", "Ruthin", "Ryde", "Rye", "Saffron Walden", "Saintfield", "Salcombe", "Sale", "Salford", "Salisbury", "Saltash", "Saltcoats", "Sandbach", "Sandhurst", "Sandown", "Sandwich", "Sandy", "Sawbridgeworth", "Saxmundham", "Scarborough", "Scunthorpe", "Seaford", "Seaton", "Sedgefield", "Selby", "Selkirk", "Selsey", "Settle", "Sevenoaks", "Shaftesbury", "Shanklin", "Sheerness", "Sheffield", "Shepshed", "Shepton Mallet", "Sherborne", "Sheringham", "Shildon", "Shipston on Stour", "Shoreham by Sea", "Shrewsbury", "Sidmouth", "Sittingbourne", "Skegness", "Skelmersdale", "Skipton", "Sleaford", "Slough", "Smethwick", "Soham", "Solihull", "Somerton", "South Molton", "South Shields", "South Woodham Ferrers", "Southam", "Southampton", "Southborough", "Southend on Sea", "Southport", "Southsea", "Southwell", "Southwold", "Spalding", "Spennymoor", "Spilsby", "Stafford", "Staines", "Stamford", "Stanley", "Staveley", "Stevenage", "Stirling", "Stockport", "Stockton on Tees", "Stoke on Trent", "Stone", "Stowmarket", "Strabane", "Stranraer", "Stratford upon Avon", "Strood", "Stroud", "Sudbury", "Sunderland", "Sutton Coldfield", "Sutton in Ashfield", "Swadlincote", "Swanage", "Swanley", "Swansea", "Swindon", "Tadcaster", "Tadley", "Tain", "Talgarth", "Tamworth", "Taunton", "Tavistock", "Teignmouth", "Telford", "Tenby", "Tenterden", "Tetbury", "Tewkesbury", "Thame", "Thatcham", "Thaxted", "Thetford", "Thirsk", "Thornbury", "Thrapston", "Thurso", "Tilbury", "Tillicoultry", "Tipton", "Tiverton", "Tobermory", "Todmorden", "Tonbridge", "Torpoint", "Torquay", "Totnes", "Totton", "Towcester", "Tredegar", "Tregaron", "Tring", "Troon", "Trowbridge", "Truro", "Tunbridge Wells", "Tywyn", "Uckfield", "Ulverston", "Uppingham", "Usk", "Uttoxeter", "Ventnor", "Verwood", "Wadebridge", "Wadhurst", "Wakefield", "Wallasey", "Wallingford", "Walsall", "Waltham Abbey", "Waltham Cross", "Walton on Thames", "Walton on the Naze", "Wantage", "Ware", "Wareham", "Warminster", "Warrenpoint", "Warrington", "Warwick", "Washington", "Watford", "Wednesbury", "Wednesfield", "Wellingborough", "Wellington", "Wells", "Wells next the Sea", "Welshpool", "Welwyn Garden City", "Wem", "Wendover", "West Bromwich", "Westbury", "Westerham", "Westhoughton", "Weston super Mare", "Wetherby", "Weybridge", "Weymouth", "Whaley Bridge", "Whitby", "Whitchurch", "Whitehaven", "Whitley Bay", "Whitnash", "Whitstable", "Whitworth", "Wick", "Wickford", "Widnes", "Wigan", "Wigston", "Wigtown", "Willenhall", "Wincanton", "Winchester", "Windermere", "Winsford", "Winslow", "Wisbech", "Witham", "Withernsea", "Witney", "Woburn", "Woking", "Wokingham", "Wolverhampton", "Wombwell", "Woodbridge", "Woodstock", "Wootton Bassett", "Worcester", "Workington", "Worksop", "Worthing", "Wotton under Edge", "Wrexham", "Wymondham", "Yarm", "Yarmouth", "Yate", "Yateley", "Yeadon", "Yeovil", "York"]

const animalUrlGen = () => {
  return "url(images/dog-" + Math.floor(1 + (Math.random() * Math.floor(3))) + ".jpg)"
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Animal Shelter Social Media '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: animalUrlGen(),
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(12, 6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  dogpaw: {
    width: '100%',
    marginLeft: '-1px',
    userSelect: 'none'
  },
  registerLink: {
    cursor: 'pointer'
  },
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
}));

export default function SignInSide() {


  const classes = useStyles();
  const [loginView, setLoginView] = useState(true);
  const [isOrganisation, setIsOrganisation] = useState(false);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div>
          <Collapse in={loginView}>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <img className={classes.dogpaw} src={DogPawIcon} />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
          </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="email"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
            </Button>
                <Grid container>
                  <Grid item>
                    <Link className={classes.registerLink} onClick={() => setLoginView(false)} variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Collapse>
          <Collapse in={!loginView}>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <img className={classes.dogpaw} src={CatPawIcon} />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
          </Typography>
              <form className={classes.form} noValidate>

                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="email-signup"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password-signup"
                  autoComplete="current-password"
                />
                <TextField
                  variant="outlined"
                  margin="dense"
                  required
                  fullWidth
                  id="name-signup"
                  label={isOrganisation ? "Organisation Name" : "Full Name"}
                  name="name"
                  autoFocus
                />
                <TextField
                  id="description-signup"
                  label={isOrganisation ? "Organisation Description" : "Bio"}
                  multiline
                  fullWidth
                  margin="dense"
                  rows="4"
                  variant="outlined"
                />
                <Autocomplete
                  id="location-signup"
                  required
                  options={citiesInUK}
                  classes={{
                    option: classes.option,
                  }}
                  autoHighlight
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Location"
                      margin="dense"
                      variant="outlined"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />


                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Register!
            </Button>
            <Grid container>
                  <Grid item>
                    <Link className={classes.registerLink} onClick={() => setLoginView(true)} variant="body2">
                      {"Already have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>

              </form>

            </div>
          </Collapse>
          <Box>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}