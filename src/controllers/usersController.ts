import { Request, Response, NextFunction } from 'express'
import { apiErrorHandler } from '../handlers/errorHandler'
import users from '../repositories/users'
import { getUserNFTs } from '../services/moralis'

export default class UsersController {
  constructor() { }

  /**
   * Get NFTs Function
   * @param req 
   * @param res 
   * @param next 
   */
  getNFTs = async (req: Request, res: Response, next: NextFunction) => {
    const { address } = req.params
    const chains = ['eth', 'bsc', 'matic', 'avalanche', 'fantom', 'optimism', 'arbitrum']

    try {
      let nfts = []
      for ( var i in chains ) {
        const nft_list = await getUserNFTs(chains[i], address)
        nft_list.map((obj: Object) => {
          obj['chain'] = chains[i];
          return obj;
        })
        nfts = nfts.concat(nft_list)
      }
      res.json({"success": true, "message": null, "data": nfts})
    } catch (error) {
      apiErrorHandler(error, req, res, 'Get NFTs failed.')
    }
  }
  
  getProfile = async(req, res, next) =>{
    const { address } = req.params   
    const user = await users.getProfile(address)
    return res.status(200).json({
      "success": true,
      "message": null,
      "data": user,
    })
  }

  updateProfile = async (req, res) => {
    try {
      const { address, username, bio, twitter, website } = req.body
      const files = req.files;
      var avatar = '', banner_1 = '', banner_2 = '', banner_3 = '';

      for (const key of Object.keys(files)) {
        const file = files[key];
        if ( file['fieldname'] === 'avatar' ) {
          avatar = file['path']
        } else if ( file['fieldname'] === 'banner_1' ) {
          banner_1 = file['path']
        } else if ( file['fieldname'] === 'banner_2' ) {
          banner_2 = file['path']
        } else if ( file['fieldname'] === 'banner_3' ) {
          banner_3 = file['path']
        }
      }

      const user = await users.updateProfile( address, username, bio, twitter, website, avatar, banner_1, banner_2, banner_3 )

      return res.status(200).json({
        "success": true,
        "message": null,
        "data": user,
      })
    } catch (error) {
      apiErrorHandler(error, req, res, 'Update Profile failed.')
    }
  }

  addBanner = async (req, res, next) => {
    try {
      const { address } = req.body
      var banner = ''
      if ( req.files && req.files[0] ) {
        banner = req.files[0].path
      }

      const user = users.addBanner( address, banner )

      return res.json({
        "success": true,
        "message": null,
        "data": user,
      })
    } catch (error) {
      apiErrorHandler(error, req, res, 'Add Banner failed.')
    }
  }

  removeBanner = async (req, res, next) => {
    try {
      const { address, banner } = req.body

      const user = users.removeBanner( address, banner )

      return res.json({
        "success": true,
        "message": null,
        "data": user,
      })
    } catch (error) {
      apiErrorHandler(error, req, res, 'Remove Banner failed.')
    }
  }

  addWatchlist = async (req, res, next) => {
    try {
      const { address, watchlist } = req.body

      const user = users.addWatchlist( address, watchlist )

      return res.json({
        "success": true,
        "message": null,
        "data": user,
      })
    } catch (error) {
      apiErrorHandler(error, req, res, 'Add Watchlist failed.')
    }
  }

  removeWatchlist = async (req, res, next) => {
    try {
      const { address, watchlist } = req.body

      const user = users.removeWatchlist( address, watchlist )

      return res.json({
        "success": true,
        "message": null,
        "data": user,
      })
    } catch (error) {
      apiErrorHandler(error, req, res, 'Remove Watchlist failed.')
    }
  }

  addHiddenNFT = async (req, res, next) => {
    try {
      const { address, hiddenNFT } = req.body

      const user = users.addHiddenNFT( address, hiddenNFT )

      return res.json({
        "success": true,
        "message": null,
        "data": user,
      })
    } catch (error) {
      apiErrorHandler(error, req, res, 'Add Hidden NFT failed.')
    }
  }

  removeHiddenNFT = async (req, res, next) => {
    try {
      const { address, hiddenNFT } = req.body

      const user = users.removeHiddenNFT( address, hiddenNFT )

      return res.json({
        "success": true,
        "message": null,
        "data": user,
      })
    } catch (error) {
      apiErrorHandler(error, req, res, 'Remove Hidden NFT failed.')
    }
  }

  addFollowing = async (req, res, next) => {
    try {
      const { address, following } = req.body

      const user = users.addFollowing( address, following )

      return res.json({
        "success": true,
        "message": null,
        "data": user,
      })
    } catch (error) {
      apiErrorHandler(error, req, res, 'Add Following failed.')
    }
  }

  removeFollowing = async (req, res, next) => {
    try {
      const { address, following } = req.body

      const user = users.removeFollowing( address, following )

      return res.json({
        "success": true,
        "message": null,
        "data": user,
      })
    } catch (error) {
      apiErrorHandler(error, req, res, 'Remove Following failed.')
    }
  }
}