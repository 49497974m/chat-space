class UsersController < ApplicationController
  def index
    @user = User.where('name LIKE()?', "%#{params[:keyword]}%")
    render json: @user
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def user_params
    params.require(:user).permit(:name,:email)
  end
end
