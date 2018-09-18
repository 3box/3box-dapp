pragma solidity 0.4.19;
import '../EthereumClaimsRegistry.sol';


/// @title Revoke and Publish - an interface for publishing data and 
///        rotating access to publish new data
contract RevokeAndPublish {

    event Revocation(
        address indexed genesis,
        address indexed from,
        address indexed to,
        uint updatedAt);

    mapping(address => address) public manager;
    EthereumClaimsRegistry registry = EthereumClaimsRegistry(0xAcA1BCd8D0f5A9BFC95aFF331Da4c250CD9ac2Da);

    function revokeAndPublish(address genesis, bytes32 key, bytes32 data, address newManager) public {
        publish(genesis, key, data);
        Revocation(genesis, manager[genesis], newManager, now);
        manager[genesis] = newManager;
    }

    /// @dev Publish some data
    /// @param genesis The address of the first publisher
    /// @param key The key used to identify the claim
    /// @param data The data associated with the claim
    function publish(address genesis, bytes32 key, bytes32 data) public {
        require((manager[genesis] == 0x0 && genesis == msg.sender) || manager[genesis] == msg.sender);
        registry.setClaim(genesis, key, data);
    }

    /// @dev Lookup the currently published data for genesis
    /// @param genesis The address of the first publisher
    /// @param key The key used to identify the claim
    function lookup(address genesis, bytes32 key) public constant returns(bytes32) {
      return registry.getClaim(address(this), genesis, key);
    }
}
