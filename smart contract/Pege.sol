// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Pege is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string public TokenName = "Pege";
    string public TokenSymbol = "PD";
    string public TokenDecimal = "0";
    uint public totalSupply;
    mapping(address => uint) public TokenBalances;
    address public TokenOwner;

    struct Transactions {
        address from;
        address to;
        uint tokens;
    }

    Transactions[] public TransactionList;

    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public stakingTime;
    mapping(address => bool) public isStaking;

    mapping(uint256 => mapping(address => bool)) public hasVoted;
    uint256 public proposalCount;

    struct Proposal {
        uint id;
        string title;
        string description;
        uint256 voteCount;
    }

    Proposal[] public ProposalList;

    constructor() ERC721("Ayush", "AYU") {
        TokenOwner = msg.sender;
        totalSupply = 100000;
        TokenBalances[TokenOwner] = totalSupply;
    }

    function mint(uint amount) public {
        require(msg.sender == TokenOwner, "You are not the owner");
        TokenBalances[TokenOwner] += amount;
    }

    function burn() public {
        require(msg.sender == TokenOwner, "You are not the owner");
        TokenBalances[TokenOwner] = 0;
    }

    function transfer(address to, uint tokens) public {
        require(TokenBalances[msg.sender] >= tokens, "You don't have sufficient balance");

        Transactions memory t1;
        t1.from = msg.sender;
        t1.to = to;
        t1.tokens = tokens;
        TransactionList.push(t1);

        TokenBalances[msg.sender] -= tokens;
        TokenBalances[to] += tokens;
    }

    function transfertocontract(address to, uint tokens) public {
        require(TokenBalances[TokenOwner] >= tokens, "You don't have sufficient balance");

        TokenBalances[TokenOwner] -= tokens;
        TokenBalances[to] += tokens;
    }

    function purchaseToken() public payable {
        require(msg.value > 0, "Amount must be greater than 0");
        require(TokenOwner != msg.sender, "Owner cannot buy the tokens");

        if(msg.value == 1000000) {
            payable(TokenOwner).transfer(msg.value);
            transfertocontract(msg.sender, 10);
        } else if(msg.value == 2000000) {
            payable(TokenOwner).transfer(msg.value);
            transfertocontract(msg.sender, 25);
        } else if(msg.value == 3000000) {
            payable(TokenOwner).transfer(msg.value);
            transfertocontract(msg.sender, 50);
        }
    }

    function getTransactions() public view returns(Transactions[] memory) {
        return TransactionList;
    }

    function stake(uint256 _amount) public {
        require(_amount > 0, "Stake amount must be greater than 0");
        require(TokenBalances[msg.sender] >= _amount, "Insufficient balance");
        require(!isStaking[msg.sender], "Already staking");
        TokenBalances[msg.sender] -= _amount;
        stakedBalance[msg.sender] += _amount;
        stakingTime[msg.sender] = block.timestamp;
        isStaking[msg.sender] = true;
    }

    function unstake() public {
        require(isStaking[msg.sender], "Not staking");
        if ((block.timestamp - stakingTime[msg.sender]) >= 60) {
            uint256 reward = (stakedBalance[msg.sender] * (block.timestamp - stakingTime[msg.sender])) / 100;
            uint256 unstakedAmount = stakedBalance[msg.sender] + reward;
            TokenBalances[msg.sender] += unstakedAmount;
            stakedBalance[msg.sender] = 0;
            stakingTime[msg.sender] = 0;
            isStaking[msg.sender] = false;
        } else {
            revert("Minimum staking duration not reached");
        }
    }

    function createProposal(string calldata _title, string calldata _description) public {
        require(TokenBalances[msg.sender] > 30, "You are not eligible for create proposal");
        ProposalList.push(Proposal(proposalCount, _title, _description, 0));
        proposalCount++;
    }

    function vote(uint256 _proposalId) public {
        require(TokenBalances[msg.sender] > 30, "You are not eligible for create proposal");
        require(_proposalId < ProposalList.length, "Invalid proposal ID");
        require(!hasVoted[_proposalId][msg.sender], "Already voted");

        hasVoted[_proposalId][msg.sender] = true;
        ProposalList[_proposalId].voteCount += 1;
    }

    function getProposal() public view returns(Proposal[] memory) {
        return ProposalList;
    }

    function proposalResult(uint256 _proposalId) public view returns(bool) {
        require(_proposalId < ProposalList.length, "Invalid proposal ID");
        if(ProposalList[_proposalId].voteCount > 2) {
            return true;
        }else {
            return false;
        }
    }

    struct NFT {
        uint nftId;
        string title;
        string description;
        uint price;
        address payable seller;
        string img;
        string nftImg;
        bool status;
    }

    NFT[] public NFTList;

    uint counter = 0;

    function registerNFT(string calldata _title, string calldata _description, uint _price, string calldata _img, string calldata _nftImg) public {
        require(_price > 0, "Price should be greater than 0");
        NFT memory Event1;
        Event1.nftId = counter++;
        Event1.title = _title;
        Event1.description = _description;
        Event1.price = _price;
        Event1.seller = payable(msg.sender);
        Event1.img = _img;
        Event1.nftImg = _nftImg;
        Event1.status = false;
        NFTList.push(Event1);
    }

    function buyNFT(uint _nftId, uint _price) public returns(address, uint) {
        require(NFTList[_nftId].price == _price, "Please enter the exact token");
        require(NFTList[_nftId].seller != msg.sender, "Seller cannot buy the product");
        require(NFTList[_nftId].status != true, "Sorry no ticket left");
        _mint(msg.sender, _tokenIds.current());
        _setTokenURI(_tokenIds.current(), NFTList[_nftId].nftImg);
        TokenBalances[msg.sender] -= _price;
        TokenBalances[NFTList[_nftId].seller] += _price;
        NFTList[_nftId].status = true;
        _tokenIds.increment();
        return (address(this), _tokenIds.current() - 1);
    }

    function getNFT() public view returns(NFT[] memory) {
        return NFTList;
    }
}
