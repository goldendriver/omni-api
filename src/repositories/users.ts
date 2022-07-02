import users from '../models/users'

class UsersRepository {
  constructor() {}

  getProfile = async (address: String) => {
    const filters = [{ address }]

    const user = await users.findOne({ $and: filters })

    if ( user ) {
      return user
    } else {
      return {
        address:address,
        username:'',
        bio: '',
        twitter: '',
        website: '',
        avatar: 'uploads\\default_avatar.png',
        banners: ['uploads\\default_banner.png', 'uploads\\default_banner.png', 'uploads\\default_banner.png']
      }
    }
  }

  updateProfile = async (
    address: String,
    username: String,
    bio: String,
    twitter: String,
    website: String,
    avatar: String,
    banner_1: String,
    banner_2: String,
    banner_3: String,
  ) => {
    const filters = [{ address }]
    const user = await users.findOne({ $and: filters })

    if ( user ) {
      user.username = username
      user.bio = bio
      user.twitter = twitter
      user.website = website
      if ( avatar ) user.avatar = avatar
      if ( banner_1 ) user.banners[0] = banner_1
      if ( banner_2 ) user.banners[1] = banner_2
      if ( banner_3 ) user.banners[2] = banner_3
      user.save()
      return user
    } else {
      return await users.create({
        address,
        username,
        bio,
        twitter,
        website,
        avatar: avatar?avatar:'uploads\\default_avatar.png',
        banners: [banner_1?banner_1:'uploads\\default_banner.png', banner_2?banner_2:'uploads\\default_banner.png', banner_3?banner_3:'uploads\\default_banner.png']
      })
    }
  }

  addBanner = async (address: String, banner: String) => {
    const filters = [{ address }]

    users.find({ $and: filters }).exec((err, user) => {
      if (user.length === 0) {
        return []
      } else {
        if (user && user[0]) {
          const banners = user[0].banners
          if (banner) banners.push(banner)
          user[0].banners = banners
          user[0].save()
          return user[0]
        }
      }
    })
  }

  removeBanner = async (address: String, banner: String) => {
    const filters = [{ address }]

    users.find({ $and: filters }).exec((err, user) => {
      if (user.length === 0) {
        return []
      } else {
        if (user && user[0]) {
          const banners = user[0].banners
          if (banner) {
            var filename = banner.substring(banner.lastIndexOf('/') + 1)
            filename = filename.substring(filename.lastIndexOf('\\') + 1)
            const idx = banners.indexOf('uploads\\' + filename)
            banners.splice(idx, 1)
          }
          user[0].banners = banners
          user[0].save()
          return user[0]
        }
      }
    })
  }

  addWatchlist = async (address: String, watchlist: String) => {
    const filters = [{ address }]

    users.find({ $and: filters }).exec((err, user) => {
      if (user.length === 0) {
        return []
      } else {
        if (user && user[0]) {
          const watchlists = user[0].watchlists
          watchlists.push(watchlist)
          user[0].watchlists = watchlists
          user[0].save()
          return user[0]
        }
      }
    })
  }

  removeWatchlist = async (address: String, watchlist: String) => {
    const filters = [{ address }]

    users.find({ $and: filters }).exec((err, user) => {
      if (user.length === 0) {
        return []
      } else {
        if (user && user[0]) {
          const watchlists = user[0].watchlists
          const idx = watchlists.indexOf(watchlist)
          watchlists.splice(idx, 1)
          user[0].watchlists = watchlists
          user[0].save()
          return user[0]
        }
      }
    })
  }

  addHiddenNFT = async (address: String, hiddenNFT: String) => {
    const filters = [{ address }]

    users.find({ $and: filters }).exec((err, user) => {
      if (user.length === 0) {
        return []
      } else {
        if (user && user[0]) {
          const hiddenNFTs = user[0].hiddenNFTs
          hiddenNFTs.push(hiddenNFT)
          user[0].hiddenNFTs = hiddenNFTs
          user[0].save()
          return user[0]
        }
      }
    })
  }

  removeHiddenNFT = async (address: String, hiddenNFT: String) => {
    const filters = [{ address }]

    users.find({ $and: filters }).exec((err, user) => {
      if (user.length === 0) {
        return []
      } else {
        if (user && user[0]) {
          const hiddenNFTs = user[0].hiddenNFTs
          const idx = hiddenNFTs.indexOf(hiddenNFT)
          hiddenNFTs.splice(idx, 1)
          user[0].hiddenNFTs = hiddenNFTs
          user[0].save()
          return user[0]
        }
      }
    })
  }

  addFollowing = async (address: String, following: String) => {
    const filters = [{ address }]

    users.find({ $and: filters }).exec((err, user) => {
      if (user.length === 0) {
        return []
      } else {
        if (user && user[0]) {
          const followings = user[0].followings
          followings.push(following)
          user[0].followings = followings
          user[0].save()
          return user[0]
        }
      }
    })
  }

  removeFollowing = async (address: String, following: String) => {
    const filters = [{ address }]

    users.find({ $and: filters }).exec((err, user) => {
      if (user.length === 0) {
        return []
      } else {
        if (user && user[0]) {
          const followings = user[0].followings
          const idx = followings.indexOf(following)
          followings.splice(idx, 1)
          user[0].followings = followings
          user[0].save()
          return user[0]
        }
      }
    })
  }
}

export default new UsersRepository()
