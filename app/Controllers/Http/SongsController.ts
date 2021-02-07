import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Song from 'App/Models/Song';
import Application from '@ioc:Adonis/Core/Application'

export default class SongsController {

  public async index ({view}: HttpContextContract) {
    const songs = await Song.all()

    return view.render('index', {songs})
  }

  // upload form
  public async create ({view}: HttpContextContract) {
    return view.render('upload')
  }

  public async store ({request, view}: HttpContextContract) {
    // types: ['audio']
    const audio = request.file('audio', {extnames: ['mp3', 'avi']});

    if (!audio) {
      return 'Please upload a file'
    }

    if (audio.hasErrors) {
      return audio.errors
    }

    await audio.move(Application.tmpPath('uploads'), {overwrite: false});
    if (audio.clientName && audio.subtype) {
      const song = new Song()
      song.title = audio.clientName
      song.type = audio.subtype
      await song.save()
      return view.render('uploaded')
    }

    return 'Something went wrong'
  }

  public async show ({response, params}: HttpContextContract) {
    const audio = await Song.find(params.id)

    if (audio !== null) {
      const filePath = Application.tmpPath('uploads/' + audio.title);
      response.download(filePath)
    } else {
      return response.badRequest('This song does not exist')
    }
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}
